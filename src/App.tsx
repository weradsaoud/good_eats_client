import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import GoodEats_Client from './components/structures/goodeats/GoodEats_Client';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import {auth} from '../src/globals/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import 'firebase/compat/auth';


function App() {
  //const [user] = useAuthState(auth);
  return (
    <BrowserRouter>
      <GoodEats_Client />
    </BrowserRouter>
  );
}

export default App;
