import IRoute from "../interfaces/route";
// import LoginPage from "../pages/auth/login";
// import LogoutPage from "../pages/auth/logout";
// import RegisterPage from "../pages/auth/register";
import HomePage from "../pages/Home"

const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: HomePage,
        name: 'Home Page',
        protected: true
    },
    // {
    //     path: '/register',
    //     exact: true,
    //     component: RegisterPage,
    //     name: 'Register Page',
    //     protected: false
    // },
    // {
    //     path: '/login',
    //     exact: true,
    //     component: LoginPage,
    //     name: 'Login Page',
    //     protected: false
    // },
    // {
    //     path: '/logout',
    //     exact: true,
    //     component: LogoutPage,
    //     name: 'Logout Page',
    //     protected: true
    // },
];

export default routes;