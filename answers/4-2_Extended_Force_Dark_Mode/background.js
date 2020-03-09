const updateTab = (tabId, background, foreground) => {
  const code = `* {
    background-color: ${background} !important;
    color: ${foreground} !important;
  }`;
  chrome.tabs.insertCSS(tabId, { code });
};

const getSettings = (callback) => {
  chrome.storage.local.get({
    background: "#121212",
    foreground: "#ffffff",
    blacklist: [],
  }, ({ background, foreground, blacklist }) => {
    callback(background, foreground, blacklist);
  });
}

const refreshAllTabs = () => {
  getSettings((background, foreground, blacklist) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
      return;
    }

    chrome.tabs.query({}, (tabs) => {
      tabs
        .filter(tab => !blacklist.includes(new URL(tab.url).host))
        .forEach((tab) => {
          updateTab(tab.id, background, foreground);
        });
    });
  });
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
  if (changeInfo.status !== "loading") {
    return;
  }

  getSettings((background, foreground, blacklist) => {
    if (!blacklist.includes(new URL(tabInfo.url).host)) {
      updateTab(tabInfo.id, background, foreground);
    }
  });
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") {
    return;
  }

  refreshAllTabs();
});

refreshAllTabs();
