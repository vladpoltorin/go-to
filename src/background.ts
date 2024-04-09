let aliases: Record<string, string> = {};

chrome.storage.local.get().then((data) => {
  Object.assign(aliases, data);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes) {
    for (const key in changes) {
      aliases[key] = changes[key].newValue;
    }
  }
});

chrome.webNavigation.onErrorOccurred.addListener((details) => {
  console.log('error', details);
});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameType !== 'outermost_frame') {
    return;
  }

  const slug = details.url.split('/to/')[1];

  if (aliases[slug]) {
    const urlToGo = aliases[slug];
    chrome.tabs.update(details.tabId, { url: urlToGo });
  }
}, { url: [{ urlMatches: 'http://to/*' }] });

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameType !== 'outermost_frame') {
    return;
  }

  const url = new URL(details.url);
  const search = new URLSearchParams(url.search);
  const query = search.get('q');

  if (!query || !query.includes('to/')) {
    return;
  }

  const slug = query.split('to/')[1];

  if (aliases[slug]) {
    const urlToGo = aliases[slug];
    chrome.tabs.update(details.tabId, { url: urlToGo });
  }
}, { url: [{ urlMatches: 'https://www.google.com/search/*' }] });

chrome.runtime.onInstalled.addListener(({reason}) => {
  if (reason === 'install') {
    chrome.tabs.create({
      url: "dist/options.html"
    });
  }
});