import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase-config";
import { FirebaseError } from "firebase/app";
import { Link } from "react-router-dom";

export interface ILoginPageProps {}

const Login: React.FC<ILoginPageProps> = (props) => {
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const [user, setUser] = useState<any>({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser || {});
  });

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
    }
    catch (error){
    if (error instanceof FirebaseError) {
      const errorCode: string = error.code;
      const errorMessage: string = error.message;
      console.log(errorCode, errorMessage);
      
    }
    else {
      console.log(error);
    }
  }
};

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    }
    catch (error){
    if (error instanceof FirebaseError) {
      const errorCode: string = error.code;
      const errorMessage: string = error.message;
      console.log(errorCode, errorMessage);
      
    }
    else {
      console.log(error);
    }
   }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const guest = async () => {
    try{
      const anonymous = await signInAnonymously(auth);
    }
    catch (error){
      if (error instanceof FirebaseError) {
        const errorCode: string = error.code;
        const errorMessage: string = error.message;
        console.log(errorCode, errorMessage);
        
      }
      else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1>User Logged In: </h1> {user?.UID}
      <button onClick={logout}>Sign Out</button>
      <div>
        <h2>Register</h2>
        <form onSubmit={register}>
          <input
            value={registerEmail}
            placeholder="Email"
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <input
            value={registerPassword}
            placeholder="Password"
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      </div>

      <div>
        <h2>Login</h2>
        <form onSubmit={login}>
          <input
            value={loginEmail}
            placeholder="Email"
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            value={loginPassword}
            placeholder="Password"
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>

      <div>
        <button onClick={guest}>Continue as Guest</button>
      </div>
    </>
  );
}

export default Login;
