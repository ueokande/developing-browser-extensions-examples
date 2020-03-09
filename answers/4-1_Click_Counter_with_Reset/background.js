chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  switch (data.type) {
  case 'click':
    chrome.storage.local.get({ count: 0 }, ({ count }) => {
      chrome.storage.local.set({ count: count + 1 });
      chrome.browserAction.setBadgeText({ text: String(count + 1) });
    });
  }
});

chrome.browserAction.onClicked.addListener(() => {
  chrome.storage.local.set({ count: 0 });
  chrome.browserAction.setBadgeText({ text: String(0) });
});
