import api from "./api";

export const login = async (email: string, password: string) => {
  try {
    const response = await api.get('/users', { params: { email, password } });
    if (response.data.length > 0) {
      const user = response.data[0];
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao fazer login', error);
    return false;
  }
};

export const createLogin = async (usuarioData: object) => {
  try {
    const response = await api.post('/users', usuarioData);
    
    if (response.data) {
      return response
    }
    return false;
  } catch (error) {
    console.error('Erro ao adicionar o login', error);
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const verifyAuth = () => {
  return !!localStorage.getItem('token');
};