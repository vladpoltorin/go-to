import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  return (
    <div>
      <h1>React app</h1>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
