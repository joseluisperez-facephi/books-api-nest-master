import React, { Component, useState, useEffect } from "react";
import axios from 'axios';



const baseURL = "http://localhost:8083/api/auth-books/register"

class RegisterPage extends Component {

    state = {
        form: {
            fullName: '',
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

    agregarUsuario = async () => {
        await axios.post(baseURL, {
            fullName: this.state.form.fullName,
            email: this.state.form.email,
            password: (this.state.form.password)
        })
            .then(response => {
                console.log(response.data);
                return (response.data);
            })
            .then(response => {
                if (response.token) {

                    alert(`Te has registrado bien amigo ${response.email}`);
                    window.location.href = "/";

                } else {
                    alert(' El usuario o la contraseña no es correcto')
                }

            })
            .catch(error => {

                if (error.response.data.error === "Bad Request") {
                    alert(error.response.data.message.join('\n'))
                } else {
                    alert(' Hubo un problema desconocido')
                }
            })
  }




    render() {
        return (
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <div className="form-group">
                        <label>Email: </label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Introduce un Email"
                            name="email"
                            onChange={this.handleChange}

                        />
                        <br />
                        <label>Nombre: </label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Introduce un Nombre"
                            name="fullName"
                            onChange={this.handleChange}

                        />
                        <br />
                        <label>Contraseña: </label>
                        <br />
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Introduce una Contraseña"
                            name="password"
                            onChange={this.handleChange}
                        />
                        <br />
                        <button className="btn btn-primary" onClick={() => this.agregarUsuario()}>Agregar Usuario</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default RegisterPage;