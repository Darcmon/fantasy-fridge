import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContainer from '../../components/AuthContainer/AuthContainer';
import ErrorText from '../../components/ErrorText/ErrorText';
import { auth } from '../../config/firebase-config';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterPage: React.FunctionComponent<IPageProps> = props => {
    const [registering, setRegistering] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const register = () => {
        if (password !== confirm)
        {
            setError('Please make sure your passwords match.');
            return;
        }

        if (error !== '') setError('');

        setRegistering(true);

        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            logging.info(result);
            navigate('/login');
        })
        .catch(error => {
            logging.error(error);

            if (error.code.includes('auth/weak-password'))
            {
                setError('Please enter a stronger password.');
            }
            else if (error.code.includes('auth/email-already-in-use'))
            {
                setError('Email already in use.');
            }
            else
            {
                setError('Unable to register.  Please try again later.')
            }

            setRegistering(false);
        });
    }

    return (
        <AuthContainer header="Register">
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
            <form>
                <input 
                    autoComplete="new-password"
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder="Confirm Password"
                    onChange={event => setConfirm(event.target.value)}
                    value={confirm}
                />
            </form>
            <button
                disabled={registering}
                color="success"
                onClick={() => register()}
            >
                Sign Up
            </button>
            <small>
                <p className='m-1 text-center'>Already have an account? <Link to="/login">Login.</Link></p>
            </small>
            <ErrorText error={error} />
        </AuthContainer>
    );
}

export default RegisterPage;