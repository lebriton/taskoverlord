use crate::shell::{check_output, check_output_from_parts};
use anyhow::{Context, Result};
use chrono::NaiveDateTime;
use serde::{Deserialize, Deserializer, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Task {
    pub description: String,
    #[serde(default, deserialize_with = "deserialize_optional_taskwarrior_datetime")]
    pub due: Option<NaiveDateTime>,
    #[serde(deserialize_with = "deserialize_taskwarrior_datetime")]
    pub entry: NaiveDateTime,
    pub id: u32,
    #[serde(deserialize_with = "deserialize_taskwarrior_datetime")]
    pub modified: NaiveDateTime,
    pub priority: Option<String>,
    pub project: Option<String>,
    #[serde(default, deserialize_with = "deserialize_optional_taskwarrior_datetime")]
    pub start: Option<NaiveDateTime>,
    pub status: String,
    pub tags: Option<Vec<String>>,
    pub urgency: f32,
    pub uuid: String,
    #[serde(default, deserialize_with = "deserialize_optional_taskwarrior_datetime")]
    pub wait: Option<NaiveDateTime>,
}

fn parse_taskwarrior_datetime(s: &str) -> Result<NaiveDateTime, chrono::ParseError> {
    // Taskwarrior uses a specific ISO 8601 datetime format, as explained here:
    // https://github.com/GothenburgBitFactory/taskwarrior/blob/develop/doc/devel/rfcs/task.md#data-type-date
    let fmt = "%Y%m%dT%H%M%SZ";
    NaiveDateTime::parse_from_str(s, fmt)
}

fn deserialize_taskwarrior_datetime<'de, D>(deserializer: D) -> Result<NaiveDateTime, D::Error>
where
    D: Deserializer<'de>,
{
    let s: String = Deserialize::deserialize(deserializer)?;
    parse_taskwarrior_datetime(&s).map_err(serde::de::Error::custom)
}

fn deserialize_optional_taskwarrior_datetime<'de, D>(deserializer: D) -> Result<Option<NaiveDateTime>, D::Error>
where
    D: Deserializer<'de>,
{
    let s: Option<String> = Deserialize::deserialize(deserializer)?;
    s.map_or(Ok(None), |ref s| {
        parse_taskwarrior_datetime(s)
            .map(Some)
            .map_err(serde::de::Error::custom)
    })
}

pub fn add_task(description: String) -> Result<Task> {
    let command_parts = vec!["task", "add", description.as_str()];

    check_output_from_parts(command_parts, true).context("Failed to add task")?;
    let output = check_output("task +LATEST export rc.json.array=off", false)
        .context("Failed to retrieve the latest task after adding")?;
    let new_task: Task = serde_json::from_str(&output.lines).context("Failed to parse the new task from JSON")?;

    Ok(new_task)
}

pub fn get_projects() -> Result<Vec<String>> {
    let output = check_output("task projects", true).context("Failed to retrieve projects from Taskwarrior")?;
    let projects = output.lines.lines().map(String::from).collect();

    Ok(projects)
}

pub fn get_tasks() -> Result<Vec<Task>> {
    let output = check_output("task export", true).context("Failed to retrieve tasks from Taskwarrior")?;
    let tasks: Vec<Task> = serde_json::from_str(&output.lines).context("Failed to parse tasks from JSON")?;

    Ok(tasks)
}

pub fn modify_task(task_uuid: String, description: Option<String>) -> Result<()> {
    let mut command_parts = vec!["task", task_uuid.as_str(), "modify"];

    if let Some(ref desc) = description {
        command_parts.push(desc.as_str());
    }

    check_output_from_parts(command_parts, true).context("Failed to modify task")?;
    Ok(())
}

pub fn modify_task_status(task_uuid: String, action: String) -> Result<()> {
    let command_parts = match action.as_str() {
        "complete" => vec!["task", "done", task_uuid.as_str()],
        "delete" => vec!["task", "rc.confirmation=off", "delete", task_uuid.as_str()],
        "reset" | "restore" => vec!["task", task_uuid.as_str(), "modify", "status:pending"],
        "start" => vec!["task", "start", task_uuid.as_str()],
        "stop" => vec!["task", "stop", task_uuid.as_str()],
        _ => return Ok(()),
    };
    check_output_from_parts(command_parts, true).context("Failed to update task status")?;
    Ok(())
}
