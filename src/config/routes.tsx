import IRoute from "../interfaces/route";
import LoginPage from "../pages/auth/Login"
import LogoutPage from "../pages/auth/Logout";
import RegisterPage from "../pages/auth/Register";
import HomePage from "../pages/Home"

const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: HomePage,
        name: 'Home Page',
        protected: true
    },
    {
        path: '/register',
        exact: true,
        component: RegisterPage,
        name: 'Register Page',
        protected: false
    },
    {
        path: '/login',
        exact: true,
        component: LoginPage,
        name: 'Login Page',
        protected: false
    },
    {
        path: '/logout',
        exact: true,
        component: LogoutPage,
        name: 'Logout Page',
        protected: true
    },
];

export default routes;