import { BrowserRouter, Routes, Route } from "react-router-dom"
import {  Container } from "@mui/material";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import  LoginPage  from './components/LoginPage'
import  SearchBooks  from './components/SearchBooks'
import  NavBar from "./components/NavBar";


export default function App() {

  const [ books, setBooks ] = useState([]);
  const [ tablaBooks, setTablaBooks ] = useState([])
  const [ busqueda, setBusqueda ] = useState("");


  return (
    <BrowserRouter>
    <NavBar/>
   
      <Container>
      <Routes>
        <Route path="/" exact element={<LoginPage /> } />
        <Route path="/api/books" element={<SearchBooks /> } />
      </Routes>
      </Container>
    </BrowserRouter>
  );

  }

  