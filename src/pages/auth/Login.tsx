import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContainer from '../../components/AuthContainer/AuthContainer';
import ErrorText from '../../components/ErrorText/ErrorText';
import { auth } from '../../config/firebase-config';
import { signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';
import firebase from 'firebase/app';

const LoginPage: React.FC<IPageProps> = props => {
    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const login = () => {
        if (error !== '') setError('');

        setAuthenticating(true);

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            logging.info(result);
            navigate('/');
        })
        .catch(error => {
            logging.error(error);
            setAuthenticating(false);
            setError(error.message);
        });
    }

    const loginAnonymously = () => {
        if (error !== '') setError('');

        setAuthenticating(true);

        signInAnonymously(auth)
        .then(result => {
            logging.info(result);
            navigate('/');
        })
        .catch(error => {
            logging.error(error);
            setAuthenticating(false);
            setError(error.message);
        });
    }

    return (
        <AuthContainer header="Login">
            <form>
                <input 
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                />
            </form>
            <form>
                <input 
                    autoComplete="new-password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                />
            </form>
            <button
                disabled={authenticating}
                color="success"
                onClick={() => login()}
            >
                Login
            </button>
            <small>
                <p className='m-1 text-center'>Don't have an account? <Link to="/register">Register here.</Link></p>
            </small>
            <ErrorText error={error} />
            <hr className="bg-info m-3" />
            <button
            disabled={authenticating}
            color="success"
            onClick={() => loginAnonymously()}
            >
                Continue as Guest
            </button>
        </AuthContainer>
    );
}

export default LoginPage;