import {Timeline} from "antd";
import {ClockCircleOutlined} from '@ant-design/icons';
import UserLayout from "../../components/layouts/UserLayout";
import {useParams} from "react-router-dom";
import {useBooking} from "../../hooks/booking.hooks";
import moment from "moment";


const BookingTimeline = () => {
    const {id} = useParams<{ id: string }>();
    const {data: booking} = useBooking(id ?? "");
    return (
        <UserLayout>
            <div>
                <h1 style={{
                    textAlign: "center",
                    marginBottom: 50
                }}>{booking?.[0].fromStop.location} - {booking?.[booking?.length - 1].toStop.location}</h1>
                <Timeline
                    mode="alternate"
                    items={booking?.map((item) => ({
                        children: `${moment(item.startTime).format('DD.MM HH:mm')} | ${item.fromStop.location} | ${item.durationText} | ${item.distanceText}`,
                        dot: <ClockCircleOutlined style={{fontSize: '16px'}}/>,
                        color: 'green',
                    }))
                    }
                />
            </div>
        </UserLayout>
    );
}

export default BookingTimeline;