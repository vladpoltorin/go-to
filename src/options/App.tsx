import { useEffect, useState } from "react";

export const App = () => {
  // ts-ignore
  const [availableLinks, setAvailableLinks] = useState<Record<string, string>>({});

  useEffect(() => {
    chrome.storage.local.get().then((data) => {
      setAvailableLinks(data);
    })
  }, []);

  return (
    <div>
      <label htmlFor="input"></label>
      {Object.entries(availableLinks).map(([shortcut, link]) => {
        return (
          <div key={shortcut}>
            <span>to/</span>
            <span>{shortcut}</span>{' '}
            <span>{link}</span>
          </div>
        );
      })}
      {/* <input id="input" value={input} onChange={(e) => setInput(e.target.value)} /> */}
    </div>
  );
};
