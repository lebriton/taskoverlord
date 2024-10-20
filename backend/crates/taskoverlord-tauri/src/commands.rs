use taskoverlord_taskwarrior::Task;

#[tauri::command(async)]
#[specta::specta]
pub fn add_task(description: String) -> Task {
    taskoverlord_taskwarrior::add_task(description).unwrap()
}

#[tauri::command(async)]
#[specta::specta]
pub fn get_projects() -> Vec<String> {
    taskoverlord_taskwarrior::get_projects().unwrap()
}

#[tauri::command(async)]
#[specta::specta]
pub fn get_task(task_uuid: String) -> Task {
    taskoverlord_taskwarrior::get_task(task_uuid).unwrap()
}

#[tauri::command(async)]
#[specta::specta]
pub fn get_tasks() -> Vec<Task> {
    taskoverlord_taskwarrior::get_tasks().unwrap()
}
