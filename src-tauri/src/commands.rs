use crate::taskwarrior;

#[tauri::command]
pub fn get_all_tasks() -> Vec<taskwarrior::Task> {
    taskwarrior::get_all_tasks().unwrap_or_default()
}
