import {Avatar, Button, List, Skeleton} from "antd";
import {useAuth} from "../../../context/AuthContext";
import {useBookingsByUser} from "../../../hooks/booking.hooks";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import {BookOutlined} from "@ant-design/icons";

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
                                avatar={<BookOutlined />}
                                title={`${item?.[0]?.fromStop?.location} -> ${item?.[item?.length - 1]?.fromStop?.location}`}
                                description={`${item[0].booking.type} | Passengers: ${item[0].booking.passengersNo} | Date: ${moment(item[0].startTime).format("YYYY-MM-DD HH:mm")} | Duration: ${item[0].durationText} | Route: ${item?.map((l: any) => l?.fromStop?.location).join(" -> ")}`}/>
                        </Skeleton>
                    </List.Item>
                )}
            />
        </>
    )
}

export default PastTickets;