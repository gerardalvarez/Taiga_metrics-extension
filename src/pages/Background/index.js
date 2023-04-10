console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'updateLocalStorage') {
    chrome.storage.local.set({ logged_in: request.logged_in }, () => {
      console.log(
        'Datos guardados en el almacenamiento local. ' + request.logged_in
      );
    });

    chrome.storage.local.set(
      { proyecto_actual: request.proyecto_actual },
      () => {
        console.log(
          'Datos guardados en el almacenamiento local. ' +
            request.proyecto_actual
        );
      }
    );

    chrome.tabs.query(
      { url: 'https://tree.taiga.io/project/*/timeline' },
      function (tabs) {
        if (tabs.length > 0) {
          // Se encontró la pestaña
          chrome.tabs.reload(tabs[0].id);
        } else {
          // La pestaña no está abierta
          // Puedes abrir la pestaña usando chrome.tabs.create
        }
      }
    );
  }

  if (request.type === 'reloadpage') {
    chrome.tabs.query(
      { url: 'https://tree.taiga.io/project/*/timeline' },
      function (tabs) {
        if (tabs.length > 0) {
          // Se encontró la pestaña
          chrome.tabs.reload(tabs[0].id);
        } else {
          // La pestaña no está abierta
          // Puedes abrir la pestaña usando chrome.tabs.create
        }
      }
    );
  }

  chrome.storage.local.get('logged_in', (data) => {
    console.log(data);
  });
});
