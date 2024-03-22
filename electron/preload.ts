import { ipcRenderer, contextBridge } from 'electron';
const os = require('os');
const fs = require('fs');
const path = require('path');
// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('electron', {
  homeDir: () => os.homedir(),
  osVersion: () => os.arch(),
});
contextBridge.exposeInMainWorld('electronFs', {
  appendFile: fs.appendFile,
  write(id, content) {},
});
contextBridge.exposeInMainWorld('electronPath', {
  path: path,
});
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    ipcRenderer.on(channel, (event, ...args) => listener(event, ...args));
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    ipcRenderer.invoke(channel, ...omit);
  },

  // You can expose other APTs you need here.
  // ...
  homeDir: () => os.homedir(),
});
