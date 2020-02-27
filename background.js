const facebookRegex = new RegExp("^(http://|https://).*\.facebook\.com/");
const isFacebook = (tabId, changeInfo, tab) => {
  if (facebookRegex.test(tab.url)) {
    chrome.pageAction.show(tabId);
  }
};

chrome.tabs.onUpdated.addListener(isFacebook);
