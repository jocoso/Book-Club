import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '@/utils/mutations/userMutations';
import { useHistory } from 'react-router-dom';

const UserSignup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [addUser] = useMutation(ADD_USER);
  const history = useHistory();

  const handleSignup = async () => {
    try {
      const response = await addUser({ variables: { username, email, password } });
      const token = response.data.addUser.token;
      localStorage.setItem('id_token', token);
      history.push('/user-profile');
    } catch (err) {
      setError('Sign-up failed');
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign Up</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default UserSignup;
