import { useState } from 'react'; // Add useState from React
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations/mutations'; // Import your login mutation

const LoginPage = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      // Save the token to localStorage
      localStorage.setItem('id_token', data.login.token);
      window.location.href = '/'; // Redirect to home or wherever you want
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

