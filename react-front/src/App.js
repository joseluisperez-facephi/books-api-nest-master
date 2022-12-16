import { BrowserRouter, Routes, Route } from "react-router-dom"
import {  Container } from "@mui/material";
// import {  useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import  LoginPage  from './components/LoginPage'
import  SearchBooks  from './components/SearchBooks'
import  NavBar from "./components/NavBar";
import RegisterPage from "./components/RegisterPage";

export default function App() {

  // const [ books, setBooks ] = useState([]);
  // const [ tablaBooks, setTablaBooks ] = useState([])
  // const [ busqueda, setBusqueda ] = useState("");


  return (
    <BrowserRouter>
    <NavBar/>
   
      <Container>
      <Routes>
        <Route path="/" exact element={<LoginPage /> } />
        <Route path="/api/auth-books/register" exact element={<RegisterPage /> } />
        <Route path="/api/books" exact element={<SearchBooks /> } />
      </Routes>
      </Container>
    </BrowserRouter>
  );

  }

  