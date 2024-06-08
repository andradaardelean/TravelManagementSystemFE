import {Route} from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
import SignUpUser from "./SignUpUser";
import SignUpCompany from "./SignUpCompany";
import Home from "./Home";

const AuthRoutes = () => {
    return (
        <>
            <Route path="/signup/:token" element={<SignUpCompany/>}/>
            <Route path="/signup" element={<SignUpUser/>}/>
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
            <Route path="/change-password/:token" element={<ChangePassword/>}/>
            <Route path="/home" element={<Home/>}/>
        </>
    );
};

export default AuthRoutes;
