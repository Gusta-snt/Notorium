const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    openMainWindow: () => ipcRenderer.invoke('global:openMainWindow')
})