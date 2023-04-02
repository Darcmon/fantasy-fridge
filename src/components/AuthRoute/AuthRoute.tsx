import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import logging from "../../config/logging";
import { auth } from "../../config/firebase-config";

export interface IAuthRouteProps {
    children: React.ReactNode;
}
 
const AuthRoute: React.FC<IAuthRouteProps> = props => {
    const { children } = props;

    if (!auth.currentUser) 
    {
        logging.warn('User not detected, redirecting to login page.');
        return <Navigate to="/login" />;
    }

    return ( 
    <>
        {children}
    </> 
    );

}
 
export default AuthRoute;