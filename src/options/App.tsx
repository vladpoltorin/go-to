import { useEffect, useState, Fragment, useRef } from "react";
import { LinkPanel } from "./components/LinkPanel";
import { LinkForm } from "./components/LinkForm";

export const App = () => {
  const [availableLinks, setAvailableLinks] = useState<[string, string][]>([]);
  const [slugInput, setSlugInput] = useState('to');
  const [userSlug, setUserSlug] = useState('to');

  // save aliases to prevent getting them from storage every time
  const aliases = useRef<Record<string, string>>({});

  useEffect(() => {
    chrome.storage.local.get().then((data) => {
      // get aliases and save into ref
      aliases.current = data.aliases ?? {};
      setAvailableLinks(Object.entries(data.aliases ?? {}));
      
      if (data['__user__slug__']) {
        setUserSlug(data['__user__slug__']);
        setSlugInput(data['__user__slug__']);
      }
    });
  }, []);

  const handleCreateLink = (shortcut: string, address: string, ) => {
    aliases.current[shortcut] = address;
    chrome.storage.local.set({ aliases: aliases.current }).then(() => {
      setAvailableLinks((prev) => [ ...prev, [shortcut, address] ]);
    });
  };

  const handleDeleteLink = (shortcut: string) => {
    delete aliases.current[shortcut];
    chrome.storage.local.set({ aliases: aliases.current }).then(() => {
      setAvailableLinks((prev) => prev.filter(([key]) => key !== shortcut));
    });
  };

  const handleUpdateLink = (prevShortcut: string, shortcut: string, address: string) => {
    handleDeleteLink(prevShortcut);
    handleCreateLink(shortcut, address);
  };

  const handleUserSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugInput(e.target.value);
  };

  const updateUserSlug = () => {
    chrome.storage.local.set({ '__user__slug__': slugInput })
      .then(() => {
        setUserSlug(slugInput);
      });
  };

  return (
    <main>
      <h1>ToGo Quick Links Extension</h1>

      <p>The extension allows you to create quick links for your favorite resources.</p>
      <p>You can create, delete and update your links here. In future it will be possible to do so via address bar shortcuts.</p>
      <p>For now you can create your links here. <code className="codespan">{userSlug}/</code> is a default slug to run your shortcuts.</p>

      <label htmlFor="slug">
        <p>Shortcut command (ex. <code className="codespan">{slugInput}/report)</code></p>
        <div className="slug_controls">
          <input id="slug" value={slugInput} onChange={handleUserSlug} />
          <button onClick={updateUserSlug} disabled={!slugInput || userSlug === slugInput}>Update</button>
          {slugInput && slugInput !== userSlug && <span className="text--imp">&#8592; Press to apply your changes!</span>}
        </div>
      </label>

      <hr />

      <LinkForm onSubmit={handleCreateLink} />

      <hr />

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
                    slug={userSlug}
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
