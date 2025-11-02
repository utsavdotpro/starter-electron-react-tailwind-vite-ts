// Native
import { join } from 'path';

// Packages
import { app, BrowserWindow, globalShortcut, ipcMain, IpcMainEvent, nativeTheme } from 'electron';
import isDev from 'electron-is-dev';

const height = 600;
const width = 800;

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width,
    height,
    //  change to false to use AppBar
    frame: false,
    show: true,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  });

  const port = process.env.PORT || 3000;
  const url = isDev ? `http://localhost:${port}` : join(__dirname, '../dist-vite/index.html');

  // and load the index.html of the app.
  if (isDev) {
    mainWindow?.loadURL(url);
  } else {
    mainWindow?.loadFile(url);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // For AppBar
  ipcMain.on('minimize', () => {
    if (mainWindow) {
      // eslint-disable-next-line no-unused-expressions
      mainWindow.isMinimized() ? mainWindow.restore() : mainWindow.minimize();
    }
  });
  ipcMain.on('maximize', () => {
    if (mainWindow) {
      // eslint-disable-next-line no-unused-expressions
      mainWindow.isMaximized() ? mainWindow.restore() : mainWindow.maximize();
    }
  });

  ipcMain.on('close', () => {
    if (mainWindow) {
      mainWindow.close();
    }
  });

  nativeTheme.themeSource = 'dark';
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // Enable DevTools toggle shortcut only in dev mode
  if (isDev) {
    const isMac = process.platform === 'darwin';
    const devToolsShortcut = isMac ? 'Command+Option+C' : 'Control+Shift+C';

    const registered = globalShortcut.register(devToolsShortcut, () => {
      if (mainWindow) {
        if (mainWindow.webContents.isDevToolsOpened()) {
          mainWindow.webContents.closeDevTools();
        } else {
          mainWindow.webContents.openDevTools();
        }
      }
    });

    if (!registered) {
      console.log('Failed to register DevTools shortcut');
    }
  }

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Unregister all shortcuts when the app quits
app.on('will-quit', () => {
  if (isDev) {
    globalShortcut.unregisterAll();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send('message', 'common.hiElectron'), 500);
});
