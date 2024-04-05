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
      <label htmlFor="input"></label>
      <input id="input" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={onClick}>Save this page as to/{input}</button>
    </div>
  );
};
