// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod shell;
mod taskwarrior;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::add_task,
            commands::get_all_tasks,
            commands::get_project_names,
            commands::get_taskwarrior_info,
            commands::modify_task,
            commands::update_task_status,
            commands::run_shell_command,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
