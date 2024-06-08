const withAuth = (Component: any) => {
    const AuthRoute = () => {
        const isAuth = !!localStorage.getItem("token");
        if (isAuth) {
            return Component
        } else {
            return `Navigate to="/login" replace/>`;
        }
    };

    return AuthRoute;
};

export default withAuth;
