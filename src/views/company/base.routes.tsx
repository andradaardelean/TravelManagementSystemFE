import {Route} from "react-router-dom";
import CompanyOverview from "./CompanyOverview";
import CompanyUserPage from "./CompanyUserPage";
import Profile from "../../components/Profile";
import CompanyRoutesPage from "./CompanyRoutesPage";
import CreateRoute from "./Route/CreateRoute";
import CompanyBookingsPage from "./CompanyBookingsPage";
import EditUserPage from "./User/EditUser";
import CreateUserPage from "./User/CreateUser";
import BookingTimeline from "./ViewTimeline";

const CompanyRoutes = () => {
    return (
        <>
            <Route path="/overview" element={<CompanyOverview/>}/>
            <Route path="/routes" element={<CompanyRoutesPage/>}/>
            <Route path="/routes/create" element={<CreateRoute/>}/>
            <Route path="/users" element={<CompanyUserPage/>}/>
            <Route path="/users/new" element={<CreateUserPage/>}/>
            <Route path="/users/edit/:id" element={<EditUserPage/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/bookings" element={<CompanyBookingsPage/>}/>
            <Route path="/booking-timeline/:id" element={<BookingTimeline/>}/>
        </>
    );
};

export default CompanyRoutes;
