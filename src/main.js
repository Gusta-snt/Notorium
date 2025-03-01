const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

let mainWin = null, selectFolderWin = null

const createFolderSelectionWindow = () => {
    selectFolderWin = new BrowserWindow({
        width: 700,
        height: 600,
        resizable: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    selectFolderWin.loadFile('./src/templates/screens/openFolder/index.html')

    selectFolderWin.on('closed', () => {
        selectFolderWin = null
    })
}

const createMainWindow = () => {
    mainWin = new BrowserWindow({
        width: 600,
        height: 800,
        simpleFullscreen: true
    })

    mainWin.on('closed', () => {
        mainWin = null
    })
}

ipcMain.handle('global:openMainWindow', () => {
    if(!mainWin) {
        createMainWindow()
    }
})

app.on('ready', () => {
    createFolderSelectionWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})