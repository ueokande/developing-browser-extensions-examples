document
  .getElementById("background-input")
  .addEventListener("change", (event) => {
    chrome.storage.local.set({ background: event.target.value });
  });
document
  .getElementById("foreground-input")
  .addEventListener("change", (event) => {
    chrome.storage.local.set({ foreground: event.target.value });
  });
document
  .getElementById("blacklist-input")
  .addEventListener("change", (event) => {
    chrome.storage.local.set({ blacklist: event.target.value.split(",") });
  });

chrome.storage.local.get({
  background: "#121212",
  foreground: "#ffffff",
  blacklist: [],
}, ({ background, foreground }) => {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError.message);
    return;
  }

  document.getElementById("background-input").value = background;
  document.getElementById("foreground-input").value = foreground;
  document.getElementById("blacklist-input").value = blacklist.join(",");
});
