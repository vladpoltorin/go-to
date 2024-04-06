import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './options.css';

const root = ReactDOM.createRoot(
  document.getElementById('options') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
