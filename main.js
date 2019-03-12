const {app, BrowserWindow, Menu} = require('electron');

let mainWindow;
let template = [
    {
        label: '后退',
        click: function () {
            mainWindow.webContents.goBack();
        }
    },
    {
        label: '刷新',
        click: function () {
            mainWindow.reload();
        }
    },
    {
        label: '清理缓存',
        click: function () {
            let ses = mainWindow.webContents.session;
            ses.clearCache(() => {
                mainWindow.reload();
            });
        }
    }
];

function createWindow() {
    let menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: false
        }
    });

    mainWindow.loadURL('http://172.16.28.166:9999');
    mainWindow.setTitle("哈尔滨信息工程学院作业管理系统客户端");
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});
