use anyhow::{Context, Result};
use chrono::NaiveDateTime;
use serde::{Deserialize, Deserializer, Serialize};
use specta::Type;
use std::process::Command;
use taskoverlord_subprocess::{self, CommandExt, OutputExt};

#[derive(Debug, Serialize, Deserialize, Type)]
pub struct Annotation {
    #[serde(deserialize_with = "deserialize_taskwarrior_datetime")]
    pub entry: NaiveDateTime,
    pub description: String,
}

// See https://github.com/GothenburgBitFactory/taskwarrior/blob/develop/doc/devel/rfcs/task.md#the-attributes
#[derive(Debug, Serialize, Deserialize, Type)]
pub struct Task {
    pub status: TaskStatus,

    pub uuid: String,

    #[serde(deserialize_with = "deserialize_taskwarrior_datetime")]
    pub entry: NaiveDateTime,

    pub description: String,

    #[serde(default, deserialize_with = "deserialize_optional_taskwarrior_datetime")]
    pub start: Option<NaiveDateTime>,

    #[serde(default, deserialize_with = "deserialize_optional_taskwarrior_datetime")]
    pub end: Option<NaiveDateTime>,

    #[serde(default, deserialize_with = "deserialize_optional_taskwarrior_datetime")]
    pub due: Option<NaiveDateTime>,

    #[serde(default, deserialize_with = "deserialize_optional_taskwarrior_datetime")]
    pub until: Option<NaiveDateTime>,

    #[serde(default, deserialize_with = "deserialize_optional_taskwarrior_datetime")]
    pub wait: Option<NaiveDateTime>,

    #[serde(deserialize_with = "deserialize_taskwarrior_datetime")]
    pub modified: NaiveDateTime,

    #[serde(default, deserialize_with = "deserialize_optional_taskwarrior_datetime")]
    pub scheduled: Option<NaiveDateTime>,

    pub recur: Option<String>,

    pub mask: Option<String>,

    pub imask: Option<u32>,

    pub parent: Option<String>,

    pub project: Option<String>,

    pub priority: Option<String>,

    pub depends: Option<String>,

    pub tags: Option<Vec<String>>,

    pub annotations: Option<Vec<Annotation>>,

    // Dynamic values
    pub id: u32,
    pub urgency: f32,
}

#[derive(Debug, Serialize, Type)]
pub struct TaskGroup {
    name: Option<String>,
    tasks: Vec<Task>,
}

#[derive(Debug, Serialize, Deserialize, Type)]
#[serde(rename_all = "lowercase")]
pub enum TaskStatus {
    Pending,
    Deleted,
    Completed,
    Waiting,
    Recurring,
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
    Command::new("task")
        .arg("add")
        .arg(description)
        .redirect_stderr_to_stdout()
        .output()
        .expect("failed to add task");

    let output = Command::new("task")
        .arg("+LATEST")
        .arg("export")
        .arg("rc.json.array=off")
        .output()
        .expect("failed to retrieve the latest task");
    let new_task: Task =
        serde_json::from_str(&output.utf8_lossy_stdout()).context("failed to parse the new task from JSON")?;

    Ok(new_task)
}

pub fn get_projects() -> Result<Vec<String>> {
    let output = Command::new("task")
        .arg("projects")
        .output()
        .expect("failed to retrieve projects");
    let projects = output.utf8_lossy_stdout().lines().map(String::from).collect();

    Ok(projects)
}

pub fn get_task(task_uuid: String) -> Result<Task> {
    let output = Command::new("task")
        .arg(task_uuid)
        .arg("export")
        .arg("rc.json.array=off")
        .output()
        .expect("failed to retrieve task");
    let task: Task = serde_json::from_str(&output.utf8_lossy_stdout()).context("failed to parse task from JSON")?;

    Ok(task)
}

pub fn get_tasks() -> Result<Vec<Task>> {
    let output = Command::new("task")
        .arg("export")
        .output()
        .expect("failed to retrieve tasks");
    let tasks: Vec<Task> =
        serde_json::from_str(&output.utf8_lossy_stdout()).context("failed to parse tasks from JSON")?;

    Ok(tasks)
}
