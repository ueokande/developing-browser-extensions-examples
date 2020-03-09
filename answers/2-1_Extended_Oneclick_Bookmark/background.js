const FOLDER_TITLE = "ワンクリック・ブックマーク"

const getOrCreateFolder = (callback) => {
  chrome.bookmarks.search({
    title: FOLDER_TITLE,
  }, result => {
    if (result.length > 0) {
      callback(result[0])
      return
    }
    chrome.bookmarks.create({
      title: FOLDER_TITLE,
    }, callback);
  });
}

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const tab = tabs[0];
    getOrCreateFolder((folder) => {
      chrome.bookmarks.create({
        parentId: folder.id,
        title: tab.title,
        url: tab.url,
      }, () => {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: chrome.extension.getURL('notification_icon.png'),
          title: 'Bookmark created',
          message: `Bookmark created on ${tab.url}`,
        });
      });
    });
  });
});

