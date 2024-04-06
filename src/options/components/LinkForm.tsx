import { useState, FormEvent } from 'react';

type Props = {
  onSubmit: (shortcut: string, address: string) => void;
  dest?: string;
  cut?: string;
};
export const LinkForm = ({ onSubmit, dest = "", cut = "" }: Props) => {
  const [address, setAddress] = useState(dest);
  const [shortcut, setShortcut] = useState(cut);

  const isEditing = Boolean(dest && cut);

  const handleSubmitLink = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!address || !shortcut) {
      return;
    }

    onSubmit(shortcut, address);
    setAddress("");
    setShortcut("");
  };

  return (
    <form onSubmit={handleSubmitLink} className="link_form">
      <label htmlFor="cut">
        <p>Link shortcut:</p>
        <input id="cut" type="text" placeholder="Type a shortcut" value={shortcut} onChange={(e) => setShortcut(e.target.value)} />        
      </label>

      <label htmlFor="dest">
        <p>URL:</p>
        <input id="dest" type="text" placeholder="Type an address" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>

      <button type="submit" disabled={!(address && shortcut)} className="link_btn link_btn--submit">
        {isEditing ? 'Update' : 'Create'}
      </button>
    </form>
  );
};
