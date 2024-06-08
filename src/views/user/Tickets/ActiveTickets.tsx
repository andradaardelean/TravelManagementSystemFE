import {Avatar, Button, List, Skeleton} from "antd";
import {useBookingsByUser, useDeleteBooking} from "../../../hooks/booking.hooks";
import {useAuth} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";


const ActiveTickets = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const {data: activeBookings, isLoading} = useBookingsByUser({username: user?.username ?? ""});
    const activeBookingsFiltered = activeBookings?.filter((booking) => booking[0].startTime >= new Date());
    const {mutate: cancelBooking} = useDeleteBooking();
    return (
        <>
            <List
                loading={isLoading}
                pagination={{position: "bottom", align: "center"}}
                dataSource={activeBookingsFiltered}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[<Button key="list-loadmore-edit"
                                          onClick={() => navigate(`/booking-timeline/${item[0].booking.id}`)}>View
                            Timeline</Button>,
                            <Button danger onClick={() => cancelBooking(item.id)}>Cancel</Button>]}>
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

export default ActiveTickets;