import { useState } from "react";

export const App = () => {
  const [input, setInput] = useState('');

  const onClick = async () => {
    const [currentTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true  });
    await chrome.storage.local.set({ [input]: currentTab.url });
    setInput('');
  };

  return (
    <div style={{ width: 300, height: 300 }}>
      <h3>Create a link for this page</h3>
      <label htmlFor="input">
        <p><code>to/{input}</code></p>
      </label>
      <input id="input" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={onClick}>Create</button>

      <a href="../../dist/options.html" target="_blank">Manage links</a>
    </div>
  );
};
