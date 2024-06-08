import {Avatar, Button, List, Skeleton} from "antd";
import {useAuth} from "../../../context/AuthContext";
import {useBookingsByUser} from "../../../hooks/booking.hooks";
import {useNavigate} from "react-router-dom";

const PastTickets = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const {data: pastBookings, isLoading} = useBookingsByUser({username: user?.username ?? ""});
    const pastBookingsFiltered = pastBookings?.filter((booking) => booking[0].startTime < new Date());
    return (
        <>
            <List
                loading={isLoading}
                pagination={{position: "bottom", align: "center"}}
                dataSource={pastBookingsFiltered}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[<Button key="list-loadmore-edit"
                                          onClick={() => navigate(`/booking-timeline/${item[0].booking.id}`)}>View
                            Timeline</Button>]}>
                        <Skeleton avatar title={false} loading={false} active>
                            <List.Item.Meta
                                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}/>}
                                title={`Internal ID: ${item[0].booking.id}`}
                                description={`${item[0].booking.type} | Passengers: ${item[0].booking.passengersNo}`}/>

                        </Skeleton>
                    </List.Item>
                )}
            />
        </>
    )
}

export default PastTickets;