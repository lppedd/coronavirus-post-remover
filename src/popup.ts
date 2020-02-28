window.onload = () =>
  chrome.storage.sync.get({ cprDebug: false }, settings => {
    const debug = document.getElementById('cprDebug') as HTMLInputElement;
    debug.checked = !!settings.cprDebug;
    debug.addEventListener('change', () => {
      chrome.tabs.reload();
      chrome.storage.sync.set({ cprDebug: !!debug.checked }, () =>
        console.log('Error changing debug mode')
      );
    });
  });
