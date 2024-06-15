use crate::shell::{check_output, check_output2};
use chrono::NaiveDateTime;
use serde::{Deserialize, Deserializer, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Task {
    // TODO: check types
    // TODO: NaiveDateTime should be UTC?
    pub description: String,
    #[serde(default)]
    #[serde(deserialize_with = "deserialize_optional_taskwarrior_datetime")]
    pub due: Option<NaiveDateTime>,
    #[serde(deserialize_with = "deserialize_taskwarrior_datetime")]
    pub entry: NaiveDateTime,
    pub id: u32,
    #[serde(deserialize_with = "deserialize_taskwarrior_datetime")]
    pub modified: NaiveDateTime,
    pub priority: Option<String>,
    pub project: Option<String>,
    #[serde(default)]
    #[serde(deserialize_with = "deserialize_optional_taskwarrior_datetime")]
    pub start: Option<NaiveDateTime>,
    pub status: String,
    pub tags: Option<Vec<String>>,
    pub urgency: f32,
    pub uuid: String,
    #[serde(default)]
    #[serde(deserialize_with = "deserialize_optional_taskwarrior_datetime")]
    pub wait: Option<NaiveDateTime>,
}

#[derive(Debug, Serialize)]
pub struct TaskwarriorInfo {
    pub binary_path: String,
    pub version: String,
}

// TODO: refactor to avoid code duplication
fn deserialize_taskwarrior_datetime<'de, D>(deserializer: D) -> Result<NaiveDateTime, D::Error>
where
    D: Deserializer<'de>,
{
    let s: String = Deserialize::deserialize(deserializer)?;
    // Taskwarrior uses a 'custom' ISO 8601 datetime format, as explained here:
    // https://github.com/GothenburgBitFactory/taskwarrior/blob/develop/doc/devel/rfcs/task.md#data-type-date
    let fmt = "%Y%m%dT%H%M%SZ";
    let parsed = NaiveDateTime::parse_from_str(&s, fmt).map_err(serde::de::Error::custom)?;
    Ok(parsed)
}

// TODO: refactor to avoid code duplication
fn deserialize_optional_taskwarrior_datetime<'de, D>(
    deserializer: D,
) -> Result<Option<NaiveDateTime>, D::Error>
where
    D: Deserializer<'de>,
{
    let s: Option<String> = Deserialize::deserialize(deserializer)?;
    if let Some(s) = s {
        // Taskwarrior uses a 'custom' ISO 8601 datetime format, as explained here:
        // https://github.com/GothenburgBitFactory/taskwarrior/blob/develop/doc/devel/rfcs/task.md#data-type-date
        let fmt = "%Y%m%dT%H%M%SZ";
        let parsed = NaiveDateTime::parse_from_str(&s, fmt).map_err(serde::de::Error::custom)?;
        return Ok(Some(parsed));
    }
    Ok(None)
}

pub fn add_task(description: String, already_completed: bool) -> anyhow::Result<String> {
    let command_parts = if already_completed {
        vec!["task", "log", description.as_str()]
    } else {
        vec!["task", "add", description.as_str()]
    };

    check_output2(command_parts, true)?;

    if already_completed {
        return Ok("todo: find a way to get the uuid".to_string());
    }

    // We need to return the new task uuid
    let output = check_output("task +LATEST export rc.json.array=off", false)?;
    let new_task: Task = serde_json::from_str(&output.lines)?;
    Ok(new_task.uuid)
}

pub fn get_all_tasks() -> anyhow::Result<Vec<Task>> {
    let output = check_output("task export", true)?;
    let tasks = serde_json::from_str(&output.lines)?;
    Ok(tasks)
}

pub fn get_info() -> anyhow::Result<TaskwarriorInfo> {
    Ok(TaskwarriorInfo {
        binary_path: check_output("which task", true)?.lines.trim().to_string(),
        version: check_output("task --version", true)?
            .lines
            .trim()
            .to_string(),
    })
}

pub fn get_project_names() -> anyhow::Result<Vec<String>> {
    let output = check_output("task projects", true)?;
    Ok(output.lines.lines().map(String::from).collect())
}

pub fn modify_task(task_uuid: String, description: Option<String>) -> anyhow::Result<()> {
    let mut command_parts = vec!["task", task_uuid.as_str(), "modify"];

    if let Some(ref p) = description {
        command_parts.push(p.as_str());
    }

    check_output2(command_parts, true)?;
    Ok(())
}

pub fn update_task_status(task_uuid: String, action: String) -> anyhow::Result<()> {
    let command_parts = match action.as_str() {
        "complete" => vec!["task", "done", task_uuid.as_str()],
        "delete" => vec!["task", "rc.confirmation=off", "delete", task_uuid.as_str()],
        "reset" | "restore" => vec!["task", task_uuid.as_str(), "modify", "status:pending"],
        "start" => vec!["task", "start", task_uuid.as_str()],
        "stop" => vec!["task", "stop", task_uuid.as_str()],
        _ => return Ok(()),
    };
    check_output2(command_parts, true)?;
    Ok(())
}
