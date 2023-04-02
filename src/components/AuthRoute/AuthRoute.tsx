import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../config/firebase-config";

export interface IAuthRouteProps {
    
}
 
const AuthRoute: React.FC<IAuthRouteProps> = props => {
    const { children } = props;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        AuthCheck();
    }, [auth]);

    const AuthCheck = onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoading(false);
        }
        else {
            console.log("Not logged in");
            navigate("/login");
            
        }
    });

    if (loading) {return <h1>Loading...</h1>};

    return ( 
    <>
        {children}
    </> 
    );

}
 
export default AuthRoute;