chrome.tabs.query({ currentWindow: true }, (tabs) => {
  const ul = window.document.querySelector("#tab-list-wrapper");

  tabs.forEach((tab) => {
    const li = window.document.createElement("li");
    li.textContent = tab.title;
    li.onclick = () => {
      chrome.tabs.update(tab.id, { active: true });
    };
    ul.appendChild(li);
  });
});
