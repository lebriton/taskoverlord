use crate::taskwarrior;

#[tauri::command]
pub fn get_taskwarrior_info() -> taskwarrior::TaskwarriorInfo {
    taskwarrior::get_info().unwrap()
}

#[tauri::command]
pub fn get_all_tasks() -> Vec<taskwarrior::Task> {
    taskwarrior::get_all_tasks().unwrap()
}
