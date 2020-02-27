let debug = true;

chrome.storage.local.get({
	'debug': true
}, settings => {
	if (chrome.runtime.lastError) {
		debug = true;
	} else {
		debug = settings['debug'];
	}
});

const mutationObserver = new MutationObserver(() => {
	for (let wrapper of document.querySelectorAll('div.userContentWrapper')) {
		if (wrapper.firstChild.textContent.search(/corona[ ]?virus/i) >= 0) {
			if (debug) {
				wrapper.style.border = '4px solid green';
			} else {
				wrapper.parentElement.removeChild(wrapper);
			}
		}
	}
});

mutationObserver.observe(document, {subtree: true, childList: true});
