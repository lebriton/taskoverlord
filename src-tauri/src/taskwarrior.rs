use chrono::NaiveDateTime;
use serde::{Deserialize, Deserializer, Serialize};
use std::process::Command;

use crate::shell::check_output;

#[derive(Debug, Serialize, Deserialize)]
pub struct Task {
    // TODO: check types
    // TODO: NaiveDateTime should be UTC?
    pub description: String,
    #[serde(deserialize_with = "deserialize_taskwarrior_datetime")]
    pub entry: NaiveDateTime,
    pub id: u32,
    #[serde(deserialize_with = "deserialize_taskwarrior_datetime")]
    pub modified: NaiveDateTime,
    pub project: Option<String>,
    pub status: String,
    pub tags: Option<Vec<String>>,
    pub urgency: f32,
    pub uuid: String,
    #[serde(
        default,
        deserialize_with = "deserialize_optional_taskwarrior_datetime"
    )]
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

pub fn get_all_tasks() -> anyhow::Result<Vec<Task>> {
    let output = check_output(Command::new("task").arg("export"))?;
    let tasks = serde_json::from_str(&output)?;
    Ok(tasks)
}

pub fn get_info() -> anyhow::Result<TaskwarriorInfo> {
    Ok(TaskwarriorInfo {
        binary_path: check_output(Command::new("which").arg("task"))?
            .trim()
            .to_string(),
        version: check_output(Command::new("task").arg("--version"))?
            .trim()
            .to_string(),
    })
}

pub fn get_project_names() -> anyhow::Result<Vec<String>> {
    let output = check_output(Command::new("task").arg("_projects"))?;
    Ok(output.lines().map(String::from).collect())
}
