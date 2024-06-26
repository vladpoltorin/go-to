import { useState, useEffect } from "react";
import './popup.css';

export const App = () => {
  const [input, setInput] = useState('');
  const [userCommand, setUserCommand] = useState('to');

  useEffect(() => {
    chrome.storage.local.get().then((data) => {
      if (data['__user__slug__']) {
        setUserCommand(data['__user__slug__']);
      }
    });
  }, []);

  const handleCreate = async () => {
    if (!input) return;

    const [currentTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true  });
    const storage = await chrome.storage.local.get();
    const currentAliases = storage.aliases ?? {};
    
    await chrome.storage.local.set({
      aliases: Object.assign(currentAliases, { [input]: currentTab.url })
    });
    setInput('');
  };

  return (
    <div className="popup">
      <h3>Create a link for this page</h3>
      <label htmlFor="input">
        <p><code className="codespan">{userCommand}/{input}</code></p>
      </label>
      <input id="input" value={input} onChange={(e) => setInput(e.target.value)} />
      <button className="link_btn" disabled={!input} onClick={handleCreate}>Create</button>

      <a className="manage-link" href="../../dist/options.html" target="_blank">Manage links</a>
    </div>
  );
};
