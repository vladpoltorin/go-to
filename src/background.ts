const DEFAULT_COMMAND = 'to';

let aliases: Record<string, string> = {};
let userCommand = DEFAULT_COMMAND;

chrome.storage.local.get().then((data) => {
  // get aliases
  aliases = data.aliases ?? {};

  // get user slug
  userCommand = data['__user__slug__'] ?? DEFAULT_COMMAND;
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes) {
    
    if (changes['__user__slug__']) {
      userCommand = changes['__user__slug__'].newValue;
    }

    if (changes.aliases) {
      aliases = { ...changes.aliases.newValue };
    }
  }
});

chrome.webNavigation.onErrorOccurred.addListener((details) => {
  console.error('error', details);
});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameType !== 'outermost_frame') {
    return;
  }

  const slug = details.url.split(`/${userCommand}/`)[1];

  if (aliases[slug]) {
    const urlToGo = aliases[slug];
    chrome.tabs.update(details.tabId, { url: urlToGo });
  }
}, { url: [{ urlMatches: `http://\*` }] });

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameType !== 'outermost_frame') {
    return;
  }

  const url = new URL(details.url);
  const search = new URLSearchParams(url.search);
  const query = search.get('q');

  if (!query || !query.includes(`${userCommand}/`)) {
    return;
  }

  const slug = query.split(`${userCommand}/`)[1];

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