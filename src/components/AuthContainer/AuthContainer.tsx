import React from 'react';

export interface IAuthContainerProps {
    children: React.ReactNode;
    header: any;
}

const AuthContainer: React.FC<IAuthContainerProps> = props => {
    const { children, header } = props;

    return (
        <div>
            {header}
            {children}
        </div>
    );
}

export default AuthContainer;