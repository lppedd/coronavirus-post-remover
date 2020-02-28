import TabChangeInfo = chrome.tabs.TabChangeInfo;
import Tab = chrome.tabs.Tab;

const facebookRegex = new RegExp('^(http://|https://).*\.facebook\.com/');
const isFacebook = (tabId: number, changeInfo: TabChangeInfo, tab: Tab) => {
  if (facebookRegex.test(tab.url)) {
    chrome.pageAction.show(tabId);
  }
};

chrome.tabs.onUpdated.addListener(isFacebook);
