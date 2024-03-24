#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use tauri::api::dialog::blocking::FileDialogBuilder;

#[tauri::command]
async fn save_data(data: String) -> Result<(), String> {
    let file_dialog = FileDialogBuilder::new().add_filter("Text Files", &["txt"]);

    // Replace pick_file with pick_file, pick_files, pick_folder, pick_folders, or save_file, depending on what you need
    let result = file_dialog.pick_file(); 
    fs::write(result, data).map_err(|err| err.to_string())
}

#[tauri::command]
async fn load_data() -> Result<String, String> {
    let file_dialog = FileDialogBuilder::new().add_filter("Text Files", &["txt"]);

    // Replace pick_file with pick_file, pick_files, pick_folder, pick_folders, or save_file, depending on what you need
    let result = file_dialog.pick_file();

    if let Some(file_path) = result {
        let file_content = fs::read_to_string(file_path).map_err(|err| err.to_string())?;
       
        return Ok(file_content);
    } else {
        Err("No file selected".to_string())
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_data, load_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}