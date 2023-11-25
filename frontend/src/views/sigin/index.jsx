import React, { useState } from 'react';
import axios from '../../utils/axios_instance';
import './styles.css';

export default function Signin(){

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e){
    e.preventDefault();
    
    try {
      // Faz a solicitação de autenticação usando a instância Axios configurada
      const response = await axios.post('/userSignin/', formData);
      
      window.location.href = "http://localhost:3000/";
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error);
    }
  };
  
  return(
    <div>
      <h2>SignIn</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label>Role:</label>
          <input type="text" name="role" value={formData.role} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
}