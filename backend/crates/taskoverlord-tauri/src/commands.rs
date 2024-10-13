use crate::error::Error;
use crate::taskwarrior::Task;
use crate::taskwarrior::{self, GetGroupedTasksResponse};

#[tauri::command(async)]
pub fn add_task(description: String) -> Result<Task, Error> {
    Ok(taskwarrior::add_task(description)?)
}

#[tauri::command(async)]
pub fn get_grouped_tasks() -> Result<GetGroupedTasksResponse, Error> {
    Ok(taskwarrior::get_grouped_tasks()?)
}

#[tauri::command(async)]
pub fn get_projects() -> Result<Vec<String>, Error> {
    Ok(taskwarrior::get_projects()?)
}

#[tauri::command(async)]
pub fn get_task(task_uuid: String) -> Result<Task, Error> {
    Ok(taskwarrior::get_task(task_uuid)?)
}

#[tauri::command(async)]
pub fn get_tasks() -> Result<Vec<Task>, Error> {
    Ok(taskwarrior::get_tasks()?)
}

#[tauri::command(async)]
pub fn modify_task(task_uuid: String, description: Option<String>) -> Result<(), Error> {
    Ok(taskwarrior::modify_task(task_uuid, description)?)
}

#[tauri::command(async)]
pub fn modify_task_status(task_uuid: String, action: String) -> Result<(), Error> {
    Ok(taskwarrior::modify_task_status(task_uuid, action)?)
}
