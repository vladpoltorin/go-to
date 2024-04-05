async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function start() {
  console.log("zxczczxczcx");
  // let currentTabId = await getCurrentTab();

  // chrome.webRequest.onBeforeRequest.addListener((e) => {
  //   return { cancel: true };
  // }, { tabId: currentTabId.id ?? -1, urls: ["<all_urls>"] });
};

start();
