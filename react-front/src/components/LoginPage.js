import React, { Component, useState, useEffect } from "react";
import axios from 'axios';
import { tokenToString } from "typescript";


const baseURL = "http://localhost:8083/api/auth-books/login"

class Login extends Component {

  state = {
    form: {
      email: '',
      password: ''
    }
  }
  handleChange = async e => {
    console.log(e.target)
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
    console.log(this.state.form)
  }

  iniciarSesion = async () => {
    await axios.post(baseURL, { email: this.state.form.email, password: ( this.state.form.password )})
    .then(response => {
      console.log(response.data);
      return(response.data);
    })
    .then(response => {
      if (response.token){

        alert(`Bienvenido aventurero con email ${response.email}`);
        window.location.href="/api/books";

      }else{
        alert(' El usuario o la contraseña no es correcto')
      }
    
    })
    .catch( error => {
      console.log( error );
      alert(' Hubo un problema desconocido')
    })
  }

  render() {
    return (
      <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="form-group">
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={this.handleChange}

            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleChange}
            />
            <br />
            <button className="btn btn-primary" onClick= {()=> this.iniciarSesion()}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;