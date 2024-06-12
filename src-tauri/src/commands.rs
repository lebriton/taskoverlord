use crate::shell;
use crate::shell::check_output;
use crate::taskwarrior;

#[tauri::command]
pub async fn get_all_tasks() -> Result<Vec<taskwarrior::Task>, String> {
    taskwarrior::get_all_tasks().map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_project_names() -> Result<Vec<String>, String> {
    taskwarrior::get_project_names().map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_taskwarrior_info() -> Result<taskwarrior::TaskwarriorInfo, String> {
    taskwarrior::get_info().map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn modify_task(task_uuid: String, description: Option<String>) {
    taskwarrior::modify_task(task_uuid, description);
}

#[tauri::command]
pub async fn update_task_status(task_uuid: String, action: String) {
    taskwarrior::update_task_status(task_uuid, action);
}

#[tauri::command]
pub async fn run_shell_command(command_string: String) -> Result<shell::ShellOutput, String> {
    check_output(&command_string).map_err(|e| e.to_string())
}
