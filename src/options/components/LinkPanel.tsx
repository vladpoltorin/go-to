import { useState } from 'react';
import { LinkForm } from './LinkForm';

type Props = {
  cut: string;
  link: string;
  onUpdate: (prevShortcut: string, shortcut: string, link: string) => void;
  onDelete: (shortcut: string) => void;
};

export const LinkPanel = ({ cut, link, onUpdate, onDelete }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (shortcut: string, address: string) => {
    onUpdate(cut, shortcut, address);
    setIsEditing(false);
  };

  return (
    <section className="link_block">
      <div>
        <h3>to/{cut}</h3>
        <code>{link}</code>
      </div>
      
      {isEditing && (
        <LinkForm dest={link} cut={cut} onSubmit={handleUpdate} />
      )}

      <div className="link_control-btns">
        {isEditing ? (
          <button className="link_btn" onClick={() => setIsEditing(false)}>Cancel</button>
        ) : (
          <button className="link_btn link_btn--edit" onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button className="link_btn link_btn--delete" onClick={() => onDelete(cut)}>Delete</button>
      </div>
    </section>
  );
};
