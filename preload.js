const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // You can add any Electron API calls here if needed
});
