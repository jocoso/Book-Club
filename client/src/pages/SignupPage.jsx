// src/pages/SignupPage.jsx
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/mutations/userMutations.js';

const SignupPage = () => {
  const [formState, setFormState] = useState({ email: '', password: '', username: '' });
  const [signup] = useMutation(SIGNUP_USER);

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
        const { data } = await signup({
            variables: { ...formState },
        });
        
        // Check if the user data exists and token is available
        if (data && data.addUser) {
            localStorage.setItem('id_token', data.addUser.token);
            window.location.href = '/'; // Redirect to home or wherever you want
        } else {
            console.error("Error: No user created.");
            alert("Failed to sign up. Please try again.");
        }
    } catch (e) {
        // Handle specific error messages
        if (e.message.includes("Email is already registered")) {
            alert("This email is already registered. Please try logging in.");
        } else {
            console.error("Error creating user:", e);
            alert("Failed to sign up. Please try again.");
        }
    }
};

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={formState.username}
          onChange={handleChange}
        />
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
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
