const usrinput = document.getElementById('text')
// When using the Tauri API npm package:
import { invoke } from '@tauri-apps/api/tauri'
// When using the Tauri global script (if not using the npm package)
// Be sure to set `build.withGlobalTauri` in `tauri.conf.json` to true

export async function loadfile() {
    const textdata = await invoke('load_data')
    console.log(textdata)
    usrinput.textContent = textdata
  }

