window.onload = () =>
	chrome.storage.local.get({
		'debug': true
	}, settings => {
		const debug = document.getElementById('debug');
		debug.checked = settings['debug'];
		debug.addEventListener('change', () => {
				chrome.tabs.reload();
				chrome.storage.local.set({
					'debug': debug.checked
				}, () => console.log('Error changing debug mode'));
			}
		);
	});
