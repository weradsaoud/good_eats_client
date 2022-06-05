import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import GoodEats_Client from './components/structures/goodeats/GoodEats_Client';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';


function App() {
  return (
    <BrowserRouter>
      <GoodEats_Client />
    </BrowserRouter>
  );
}

export default App;
