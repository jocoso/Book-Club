import { ref } from 'vue';

export const useAuthStore = () => {
  const isLoggedIn = ref(false);
  const token = ref(null);

  const setLogin = (newToken) => {
    token.value = newToken;
    isLoggedIn.value = true;
    localStorage.setItem('id_token', newToken);
  };

  const logout = () => {
    token.value = null;
    isLoggedIn.value = false;
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_id');
  };

  return {
    isLoggedIn,
    token,
    setLogin,
    logout,
  };
};
