import "./App.css";
import React from "react";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Login";
import Home from "./components/Home";
import Event from "./components/Event";
import Birthdays from "./components/Birthdays";
import TableComponent from "./components/Table";
import Wishlist from "./components/Wishlist";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}>
          <Route index element={<TableComponent/>}></Route>
          <Route path="birthdays" element={<Birthdays/>}></Route>
          <Route path="event" element={<Event/>}></Route>
          <Route path="wishlist" element={<Wishlist/>}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
