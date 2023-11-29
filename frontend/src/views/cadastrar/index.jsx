import React, { useState } from 'react';
import axios from '../../utils/axios_instance';
import './styles.css';

export default function SignUp(){
    async function handleSubmit(e){
        e.preventDefault();

        let data = Object.fromEntries(new FormData(e.target));
        console.log(data)
        try {
            const response = await axios.post('/userSignin/', data);
            window.location.href = "http://localhost:3000/";
        } catch (error) {
            console.error('Erro ao fazer cadastro:', error);
        }
    }

    return(
        <div>
            <div className="container container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card mt-5">
                            <div className="card-body">
                                <h1 className="card-title text-center">Cadastrar</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="description">Usuário:</label>
                                        <input type="text" className="form-control" id="username" name="username"
                                               required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Email:</label>
                                        <input type="email" className="form-control" id="email" name="email"
                                               required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Senha:</label>
                                        <input type="password" className="form-control" id="password" name="password"
                                               required />
                                    </div>
                                    <div className="form-group">
                                        <input type="hidden" className="form-control" id="role" name="role" value={"Worker"}/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Enviar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}