// authUtils.js
export const getToken = () => {
    return localStorage.getItem('id_token');
  };
  
  export const isLoggedIn = () => {
    const token = getToken();
    return !!token && !isTokenExpired(token);
  };
  
  export const logout = () => {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  };
  
  export const saveToken = (token) => {
    localStorage.setItem('id_token', token);
  };
  
  export const isTokenExpired = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  };