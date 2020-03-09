import { hasBookmark, getVisitCount, getTabCount } from "./statistics.js";

chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  switch (data.command) {
  case 'has-bookmark':
    hasBookmark(sender.url).then((result) => sendResponse({ hasBookmark: result }));
    return true;
  case 'visit-count':
    getVisitCount(sender.url).then((count) => sendResponse({ count }));
    return true;
  case 'tabs-count':
    getTabCount(sender.url).then((count) => sendResponse({ count }));
    return true;
  }
});
