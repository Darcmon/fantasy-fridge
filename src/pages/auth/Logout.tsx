import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from '../../components/AuthContainer/AuthContainer';
import { auth } from '../../config/firebase-config';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';
import { Button } from '@mui/material';

const LogoutPage: React.FC<IPageProps> = props => {

    const navigate = useNavigate();
    const Logout = () => {
        auth.signOut()
        .then(() => navigate('/'))
        .catch(error => logging.error(error));
    }

    return (
        <AuthContainer header="Logout">
            <p className='text-center'>Are you sure you want to logout?</p>
            <div className='text-center'>
                <Button variant="outlined" color='primary' onClick={() => navigate(-1)}>Cancel</Button>
                <Button variant="contained" color="error" onClick={() => Logout()}>Logout</Button>
            </div>
        </AuthContainer>
    );
}

export default LogoutPage;