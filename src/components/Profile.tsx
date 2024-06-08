import {useAuth} from "../context/AuthContext";
import {UserRoles} from "../types/constants";
import AdminLayout from "./layouts/AdminLayout";
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import UserLayout from "./layouts/UserLayout";
import CompanyLayout from "./layouts/CompanyLayout";
import {useBookingsByUser} from "../hooks/booking.hooks";

const Profile = () => {
    const {user} = useAuth();
    const {data: activeBookings, isLoading, isError} = useBookingsByUser({username: user?.username ?? ""});


    if (user?.userType === UserRoles.ADMIN) {
        return (
            <AdminLayout>
                <Avatar size={64} icon={<UserOutlined/>}/>
                <h1>{user?.username}</h1>
                <h1>{user?.userType}</h1>
            </AdminLayout>
        )
    } else if (user?.userType === UserRoles.COMPANYEMPLOYEE) {
        return (
            <CompanyLayout>
                <Avatar size={64} icon={<UserOutlined/>}/>
                <h1>{user?.username}</h1>
                <h1>{user?.userType}</h1>
                <h1>Company: {user?.company}</h1>
            </CompanyLayout>
        );
    } else {
        return (
            <UserLayout>
                <Avatar size={64} icon={<UserOutlined/>}/>
                <br/>
                <h3>Username: {user?.username}</h3>
                <h3>Role: {user?.userType}</h3>
                <h3>Bookings so far: {activeBookings?.length}</h3>
            </UserLayout>
        )
    }
}

export default Profile;