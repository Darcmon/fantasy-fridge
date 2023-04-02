import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from '../../components/AuthContainer/AuthContainer';
import { auth } from '../../config/firebase-config';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';

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
                <button color="danger" className="mr-2" onClick={() => navigate(-1)}>Cancel</button>
                <button color="info" className="mr-2" onClick={() => Logout()}>Logout</button>
            </div>
        </AuthContainer>
    );
}

export default LogoutPage;