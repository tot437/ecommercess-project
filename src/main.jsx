// eslint-disable-next-line no-unused-vars
import React from 'react';
import { StrictMode } from 'react';
// eslint-disable-next-line no-unused-vars
import { createRoot, ReactDOM } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

