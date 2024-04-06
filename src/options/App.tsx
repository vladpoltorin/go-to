import { useEffect, useState, Fragment } from "react";
import { LinkPanel } from "./components/LinkPanel";
import { LinkForm } from "./components/LinkForm";

export const App = () => {
  const [availableLinks, setAvailableLinks] = useState<[string, string][]>([]);

  useEffect(() => {
    chrome.storage.local.get().then((data) => {
      setAvailableLinks(Object.entries(data));
    });
  }, []);

  const handleCreateLink = (shortcut: string, address: string, ) => {
    chrome.storage.local.set({ [shortcut]: address }).then(() => {
      setAvailableLinks((prev) => [ ...prev, [shortcut, address] ]);
    });
  };

  const handleDeleteLink = (shortcut: string) => {
    chrome.storage.local.remove(shortcut).then(() => {
      setAvailableLinks((prev) => prev.filter(([key]) => key !== shortcut));
    });
  };

  const handleUpdateLink = (prevShortcut: string, shortcut: string, address: string) => {
    handleDeleteLink(prevShortcut);
    handleCreateLink(shortcut, address);
  };

  return (
    <main>
      <h1>ToGo Quick Links Extension</h1>

      <p>The extension allows you to create quick links for your favorite resources.</p>
      <p>You can create, delete and update your links here. In future it will be possible to do so via address bar shortcuts.</p>
      <p>For now you can create your links here. <code className="codespan">to/</code> is a default slug to run your shortcuts.</p>

      <LinkForm onSubmit={handleCreateLink} />

      {availableLinks.length > 0 && (
        <Fragment>
          <h2>Created links:</h2>
          <ul className="link_list">
            {availableLinks.map(([shortcut, link]) => {
              return (
                <li key={shortcut}>
                  <LinkPanel
                    onUpdate={handleUpdateLink}
                    onDelete={handleDeleteLink}
                    cut={shortcut}
                    link={link}
                  />
                </li>
              );
            })}
          </ul>
        </Fragment>
        )}
      
    </main>
  );
};
