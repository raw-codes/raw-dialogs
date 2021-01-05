const electron = require("electron");
const { app, BrowserWindow } = electron;

app.on("ready", () => {
	let mainWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
		},
	});
	// mainWindow.webContents.openDevTools();
	mainWindow.loadURL(`file://${__dirname}/index.html`);
});
