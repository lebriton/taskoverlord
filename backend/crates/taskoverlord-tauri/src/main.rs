// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod error;
mod shell;
mod taskwarrior;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::add_task,
            commands::get_grouped_tasks,
            commands::get_projects,
            commands::get_task,
            commands::get_tasks,
            commands::modify_task,
            commands::modify_task_status,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
