import {Navigate, Route} from "react-router-dom";
import Home from "./Home";
import Profile from "../../components/Profile";
import MyBookings from "./MyBookings";
import RouteTimeline from "./RouteTimeline";
import MyRequests from "./OtherRequests/MyRequests";
import BookingTimeline from "./ViewTimeline";
import SearchPageV2 from "./SearchV2";

const UserRoutes = () => {
    return (
        <>
            <Route path="/home" element={<Home/>}/>
            <Route path="/search" element={<SearchPageV2/>}/>
            <Route path="/my-reservations" element={<MyBookings/>}/>
            <Route path="/timeline/:id" element={<RouteTimeline/>}/>
            <Route path="/booking-timeline/:id" element={<BookingTimeline/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/my-requests" element={<MyRequests/>}/>
            <Route path="*" element={<Navigate to="/home" replace/>}/>
        </>
    );
};

export default UserRoutes;
