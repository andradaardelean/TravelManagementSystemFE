import {Navigate, Route} from "react-router-dom";
import AdminOverview from "./AdminOverview";
import Requests from "./Requests";
import Companies from "./AdminCompanyPage";
import AdminUserPage from "./Users";
import Profile from "../../components/Profile";
import AdminRoutesPage from "./AdminRoutesPage";
import AdminBookingsPage from "./AdminBookingsPage";
import CreateCompanyPage from "./Company/CreateCompany";
import EditCompanyPage from "./Company/EditCompany";
import CreateUserPage from "./User/CreateUser";
import EditUserPage from "./User/EditUser";

const AdminRoutes = () => {
    return (
        <>
            <Route path="/overview" element={<AdminOverview/>}/>
            <Route path="/routes" element={<AdminRoutesPage/>}/>
            <Route path="/requests" element={<Requests/>}/>
            <Route path="/companies" element={<Companies/>}/>
            <Route path="/companies/new" element={<CreateCompanyPage/>}/>
            <Route path="/companies/edit/:id" element={<EditCompanyPage/>}/>
            <Route path="/users" element={<AdminUserPage/>}/>
            <Route path="/users/new" element={<CreateUserPage/>}/>
            <Route path="/users/edit/:id" element={<EditUserPage/>}/>
            <Route path="/bookings" element={<AdminBookingsPage/>}/>
            <Route path="/profile" element={<Profile/>}/>

            <Route path="*" element={<Navigate to="/overview" replace/>}/>
        </>
    );
};

export default AdminRoutes;
