window.onload = () =>
  chrome.storage.local.get({
    'cprDebug': false
  }, settings => {
    const debug = document.getElementById('cprDebug');
    debug.checked = settings['cprDebug'] || false;
    debug.addEventListener('change', () => {
        chrome.tabs.reload();
        chrome.storage.local.set({
          'cprDebug': !!debug.checked
        }, () => console.log('Error changing debug mode'));
      }
    );
  });
