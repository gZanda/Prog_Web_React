import React, { useState } from 'react';
import axios from '../../utils/axios_instance';
import './styles.css';

export default function Login () {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    function handleChange(e) {
			setFormData({ ...formData, [e.target.name]: e.target.value });
			console.log(formData)
		};

    async function handleLogin(e) {
      e.preventDefault();

      try{
        const response = await axios.post('/userLogin/', formData);

				const token = response.data.token;

				localStorage.setItem('Token', token);
      } catch(error) {
        alert('Erro ao fazer login:', error)
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
																		name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
																		name="password"
                                    placeholder="Senha"
                                    value={formData.password}
                                    onChange={handleChange}
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
