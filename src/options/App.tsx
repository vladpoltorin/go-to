import { useEffect, useState, useMemo } from "react";
import { LinkPanel } from "./components/LinkPanel";

export const App = () => {
  const [availableLinks, setAvailableLinks] = useState<Record<string, string>>({});
  const [address, setAddress] = useState("");
  const [shortcut, setShortcut] = useState("");

  useEffect(() => {
    chrome.storage.local.get().then((data) => {
      setAvailableLinks(data);
    });
  }, []);

  const links = useMemo(() => Object.entries(availableLinks), [availableLinks]);

  const handleSubmitLink = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!address || !shortcut) {
      return;
    }

    chrome.storage.local.set({ [shortcut]: address }).then(() => {
      setAvailableLinks((prev) => ({ ...prev, [shortcut]: address }));
      setAddress("");
      setShortcut("");
    });
  };

  return (
    <main>
      <h1 className="bg-blue-50 font-bold">Extension Options</h1>

      <p>The extension allows you to create a quick links to your favorite resources.</p>
      <p>You can create, delete and update your links here. In future it will be possible to do so via address bar shortcuts.</p>
      <p>For now you can create your links here. <code>to/</code> is a default slug to run your shortcuts.</p>

      <form onSubmit={handleSubmitLink}>
        <label htmlFor="dest">
          Link address:
          <input id="dest" type="text" placeholder="Type an address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        

        <label htmlFor="cut">
          Link address:
          <input id="cut" type="text" placeholder="Type a shortcut" value={shortcut} onChange={(e) => setShortcut(e.target.value)} />        
        </label>

        <button type="submit" disabled={!(address && shortcut)}>Create a link</button>
      </form>

      <h2>Available links:</h2>
      {links.map(([shortcut, link]) => {
        return (
          <LinkPanel
            key={shortcut}
            shortcut={shortcut}
            link={link}
          />
        );
      })}
    </main>
  );
};
