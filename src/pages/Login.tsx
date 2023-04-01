import { useState } from 'react';

function Login() {
const [registerEmail, setRegisterEmail] = useState('');
const [registerPassword, setRegisterPassword] = useState('');
const [loginEmail, setLoginEmail] = useState('');
const [loginPassword, setLoginPassword] = useState('');

const register = async () => {};
const login = async () => {};
const logout = async () => {};

  return (
    <>
    <div>
    <h2>Register</h2>
    <form>
      <input
        type="email"
        placeholder="Email"
        value={registerEmail}
        onChange={(e) => setRegisterEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={registerPassword}
        onChange={(e) => setRegisterPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  </div>

    <div>
      <h2>Login</h2>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
    </>
  );
}

export default Login;