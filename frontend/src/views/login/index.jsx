import React, { useState } from 'react';
import axios from '../../utils/axios_instance';
import './styles.css';
import {redirect} from "react-router-dom";

export default function Login (message) {
    async function handleLogin(e) {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));

        try {
            const response = await axios.post('/userLogin/', data);
            localStorage.setItem('Role', response.data.user.role);
            localStorage.setItem('Token', response.data.token);
            window.location.href = "http://localhost:3000/admin/inicio";
        } catch(error) {
            alert('Erro ao fazer login: ' + error.message)
        }
    }

    return (
        <div className="container container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h1 className="card-title text-center">Entrar</h1>
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Senha"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Entrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
