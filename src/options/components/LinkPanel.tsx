type Props = {
  shortcut: string;
  link: string;
};

export const LinkPanel = ({ shortcut, link }: Props) => {
  return (
    <div className="link_block">
      <p>Shortcut: {shortcut}</p>
      <p>Link: {link}</p>
    </div>
  );
};