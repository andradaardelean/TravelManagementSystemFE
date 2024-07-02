import {Avatar, Button, List, Skeleton} from "antd";
import {useBookingsByUser, useDeleteBooking} from "../../../hooks/booking.hooks";
import {useAuth} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {BookOutlined} from "@ant-design/icons";
import moment from "moment";
import {useEffect, useState} from "react";


const ActiveTickets = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const {data: activeBookings, isLoading, isFetching, refetch} = useBookingsByUser({username: user?.username ?? ""});
    const {mutate: cancelBooking} = useDeleteBooking();

    const [orderedBookings, setOrderedBookings] = useState<any[]>([]);

    useEffect(() => {
        if(activeBookings){
            const ordered = activeBookings.map((booking) => {
                return booking.sort((a: any,b:any) => a.order - b.order);
            })
            setOrderedBookings(ordered);
        }
    }, [activeBookings]);

    return (
        <>
            <List
                loading={isLoading || isFetching}
                pagination={{position: "bottom", align: "center"}}
                dataSource={orderedBookings}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[<Button key="list-loadmore-edit"
                                          onClick={() => navigate(`/booking-timeline/${item[0].booking.id}`)}>View
                            Timeline</Button>,
                            <Button danger onClick={() => cancelBooking(item[0].booking.id).then(() => {
                                refetch();
                            })}>Cancel</Button>]}>
                        <Skeleton avatar title={false} loading={false} active>
                            <List.Item.Meta
                                avatar={<BookOutlined />}
                                title={`${item?.[0]?.fromStop?.location} -> ${item?.[item?.length - 1]?.toStop?.location}`}
                                description={`${item[0].booking.type} | Passengers: ${item[0].booking.passengersNo} | Date: ${moment(item[0].startTime).format("YYYY-MM-DD HH:mm")} | Duration: ${item[0].durationText} | Route: ${item?.map((l: any) => l?.fromStop?.location).join(" - ")} - ${item[item.length-1]?.toStop?.location}`}/>

                        </Skeleton>
                    </List.Item>
                )}
            />
        </>
    )
}

export default ActiveTickets;