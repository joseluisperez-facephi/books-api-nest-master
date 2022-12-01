import { Input, Box, AppBar, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";


export default function SearchBooks() {

  const [books, setBooks] = useState([]);
  const [tablaBooks, setTablaBooks] = useState([])
  const [busqueda, setBusqueda] = useState("");

  //todos los libros
  const BuscarGet = async () => {

    await axios.get("http://localhost:8083/api/books/")
      .then(response => {
        setBooks(response.data);
        setTablaBooks(response.data);
        console.log(response.data)
      }).catch(error => {
        console.log(error);
      })

  }

  //Sincroniza búsqueda input
  const handleChange = e => {

    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }
  // Filtra la busqueda
  const filtrar = (terminoBusqueda) => {
    const patternBusqueda = new RegExp(terminoBusqueda, "i");   //sensitive, Expresion regular que mejora la búsqueda

    let resultadosBusqueda = tablaBooks.filter((elemento) => 
      Object.values(elemento).find((value) => 
          value && value.toString().match(patternBusqueda)))
      // if (elemento.autor.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      //   || elemento.titulo.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      //   || elemento.id.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      //   || elemento.editorial.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      //   || elemento.isbn.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      // ) {
      //   return elemento;
      // }
    setBooks(resultadosBusqueda);
  }

  useEffect(() => {
    BuscarGet();
  }, []);

  return (


    <Box>
      <AppBar position='relative'>

      </AppBar>

      <div className='table_responsive'>
        <div className="containerInput" >
          <input
            className="inoputBuscar"
            value={busqueda}
            placeholder="BUSCAR"
            onChange={handleChange}
          />
          <Button variant='contained'  >
            Buscar
          </Button>

        </div>
        <table className="table table-sm table-borderer">
          <thead>

            <tr>
              <th>ISBN</th>
              <th>TITULO</th>
              <th>RESUMEN</th>
              <th>AUTOR</th>
              <th>CATEGORIA</th>
              <th>IDIOMA</th>
              <th>EDITORIAL</th>
              <th>ID</th>
            </tr>

          </thead>
          <tbody>
            {books && books.map((book) => (
              <tr key={book.id}>
                <td>{book.isbn}</td>
                <td>{book.titulo}</td>
                <td>{book.resumen}</td>
                <td>{book.autor}</td>
                <td>{book.categoria}</td>
                <td>{book.idioma}</td>
                <td>{book.editorial}</td>
                <td>{book.id}</td>

              </tr>


            ))}

          </tbody>
        </table>

      </div>

    </Box>



  )
}