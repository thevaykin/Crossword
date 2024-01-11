import React from 'react';
import ReactDOM from 'react-dom/client';
import { Crossword } from './Container/Crossword';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
   <Crossword />
  </React.StrictMode>
);
