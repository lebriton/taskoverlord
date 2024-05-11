use crate::taskwarrior;

#[tauri::command]
pub fn get_all_tasks() -> Vec<taskwarrior::Task> {
    taskwarrior::get_all_tasks().unwrap()
}

#[tauri::command]
pub fn get_project_names() -> Vec<String> {
    taskwarrior::get_project_names().unwrap()
}

#[tauri::command]
pub fn get_taskwarrior_info() -> taskwarrior::TaskwarriorInfo {
    taskwarrior::get_info().unwrap()
}
