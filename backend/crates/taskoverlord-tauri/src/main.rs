// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

mod commands;

use commands::{add_task, get_projects, get_task, get_tasks};
use specta_typescript::Typescript;
use taskoverlord_taskwarrior::{TaskGroup, TaskStatus};
use tauri_plugin_cli::{CliExt, Matches};
use tauri_specta::{collect_commands, Builder};

fn main() {
    let builder = Builder::<tauri::Wry>::new()
        // In Tauri, types are automatically exposed when tied to a command or an event.
        // However, we need to expose all relevant types to the frontend to maintain
        // proper functionality and data integrity. This includes types that represent
        // application state. The following lines specify that these relevant types
        // will be included in the export, allowing the frontend to utilize them effectively.
        .typ::<TaskGroup>()
        .typ::<TaskStatus>()
        .commands(collect_commands![add_task, get_projects, get_task, get_tasks]);

    tauri::Builder::default()
        .invoke_handler(builder.invoke_handler())
        .plugin(tauri_plugin_cli::init())
        .setup(move |app| {
            match app.cli().matches() {
                Ok(matches) => handle_cli_matches(matches, &builder),
                Err(e) => eprintln!("{}", e),
            }
            builder.mount_events(app);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn handle_cli_matches(matches: Matches, builder: &Builder) {
    if matches
        .args
        .get("export-ts-types")
        .is_some_and(|arg_data| arg_data.value == true)
    {
        #[cfg(debug_assertions)] // <- Only export on non-release builds
        builder
            .export(Typescript::default(), "../../../frontend/src/lib/ipc.ts")
            .expect("failed to export typescript bindings");
    }
}
