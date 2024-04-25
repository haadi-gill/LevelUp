import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Dashboard from './Dashboard';
import Navbar from '../NavBar/Navbar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Navbar />
    <Dashboard />
  </React.StrictMode>
);