import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App.jsx'
// Make sure NO other .css files are being imported here!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
