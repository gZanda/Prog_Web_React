import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // url base que vai ser usada em toda request
  timeout: 5000, //timeout de 5 segundos pra cada request
  headers: {
    'Content-Type': 'application/json',
  }
})

instance.interceptors.request.use(
  (config) => {
    // Recupere o token da sua fonte de autenticação (localStorage, cookies, etc.)
    const token = localStorage.getItem('Token');

    // Adicione o token ao cabeçalho de autorização
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;