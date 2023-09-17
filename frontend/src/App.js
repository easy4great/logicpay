//import logo from './logo.svg';
import ReactDOM from "react-dom/client";
import React, { useState } from "react";
import {Routes, Route, BrowserRouter } from "react-router-dom";
import Gnav from './gen/nav';
import Register from './gen/reg';
import Login from './gen/login';
import Unav from './user/nav';
import Uhome from './user/home';
import Transfer from './user/transfer';
import Message from './user/message';
import Notice from './user/notice';
import Trx from './user/trx';
import Paystack from './user/paystack';
import Status from './user/paystatus';
import NoUPage from "./user/npage";
import NoPage from "./gen/npage";
import './gen/Navbar.css';
//import './App.css';

export default function App() {
const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null);
  
  if (!loggedIn) {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
<Gnav/>
      </header>
      <Routes>
        <Route exact path="/" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}else if (loggedIn) {
  return (
<BrowserRouter>
    <div className="App">
      <header className="App-header">
<Unav/>
      </header>
      <Routes>
      <Route exact path="/user/" element={<Uhome setLoggedIn={setLoggedIn} />} />
        <Route exact path="/user/transfer" element={<Transfer setLoggedIn={setLoggedIn} />} />
         <Route exact path="/user/message" element={<Message setLoggedIn={setLoggedIn} />} />
         <Route exact path="/user/notice" element={<Notice setLoggedIn={setLoggedIn} />} />
         <Route exact path="/user/trx" element={<Trx setLoggedIn={setLoggedIn} />} />
        <Route exact path="/user/paystack" element={<Paystack setLoggedIn={setLoggedIn} />} />
        <Route exact path="/user/paystatus" element={<Status setLoggedIn={setLoggedIn} />} />
        <Route path="*" element={<NoUPage />} />
      </Routes>
    </div>
    </BrowserRouter>
  );}
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
