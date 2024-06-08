import {Routes} from "react-router-dom";
import {useAuth} from "./context/AuthContext";
import {UserRoles} from "./types/constants";
import {useEffect, useState} from "react";
import AdminRoutes from "./views/admin/base.routes";
import UserRoutes from "./views/user/base.routes";
import CompanyRoutes from "./views/company/base.routes";
import {useAuth0} from "@auth0/auth0-react";
import AuthRoutes from "./views/auth/base.routes";

const BaseRoutes = () => {
    const {loginWithRedirect} = useAuth0();
    const {user, isAuthenticated} = useAuth();

    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isUser, setIsUser] = useState<boolean>(false);
    const [isCompany, setIsCompany] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        if (user && isAuthenticated) {
            setIsAdmin(user.userType === UserRoles.ADMIN);
            setIsUser(user.userType === UserRoles.CLIENT);
            setIsCompany(user.userType === UserRoles.COMPANYEMPLOYEE);
            setIsLoading(false);
        }
    }, [user, isAuthenticated]);

    if (!isAuthenticated && !user && !isLoading && window.location.pathname !== "/home") {
        loginWithRedirect();
        return (
            <Routes>
                {AuthRoutes()}
            </Routes>
        )
    }

    if (window.location.pathname === "/") {
        loginWithRedirect();
        return (
            <Routes>
                {AuthRoutes()}
            </Routes>
        )
    }


    if (isLoading) {
        return (
            <Routes>
                {AuthRoutes()}
            </Routes>
        )
    }

    return (
        <Routes>
            {isAdmin && AdminRoutes()}
            {isUser && UserRoutes()}
            {isCompany && CompanyRoutes()}
            {AuthRoutes()}
        </Routes>
    )
};

export default BaseRoutes;
