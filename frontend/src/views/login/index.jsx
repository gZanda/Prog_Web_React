import React, { useState } from 'react';
import './styles.css';

export default function Login () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Lógica de autenticação aqui
        if (username === 'admin' && password === 'admin') {
            window.location.href = "http://localhost:3000/admin/inicio";
        } else {
            alert('Credenciais inválidas. Tente novamente.');
        }
    };

    return (
        <div className="container container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h1 className="card-title text-center">Entrar</h1>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nome de usuário"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary btn-block" onClick={handleLogin}>
                                Entrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
