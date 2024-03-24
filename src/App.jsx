import React, { useState } from 'react';
// When using the Tauri API npm package:
import { invoke } from '@tauri-apps/api/tauri'
import { loadfile } from '../src/modules/txtloader'
// When using the Tauri global script (if not using the npm package)
// Be sure to set `build.withGlobalTauri` in `tauri.conf.json` to true

function App() {
  const [text, setText] = useState('');

  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen flex flex-col">
      <header className="py-4 flex justify-between bg-gray-900">
        <div className="flex">
        <div id='savebtn' className="px-4 cursor-pointer hover:bg-gray-800 rounded" onClick={() => invoke('save_data', { data: text })}>
            <p className="text-sm">Save</p>
          </div>
          <div id='loadbtn' className="px-4 cursor-pointer hover:bg-gray-800 rounded" onClick={() => loadfile()}>
            <p className="text-sm">Load</p>
          </div>
        </div>
      </header>
      <textarea
        id="text"
        placeholder="Start typing..."
        className="w-full flex-grow bg-transparent border-none outline-none resize-none text-base leading-normal p-4"
        style={{ zIndex: 1, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)" }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div
        id="letterselecteddisplay"
        className="text-xs text-gray-500 absolute top-0 right-0 p-4"
        style={{ zIndex: 2 }}
      >
        {text.length} chars
      </div>
    </div>
  );
}

export default App;
