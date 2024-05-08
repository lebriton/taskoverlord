// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod shell;
mod taskwarrior;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![commands::get_all_tasks,])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
