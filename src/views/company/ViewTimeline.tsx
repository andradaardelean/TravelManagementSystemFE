import {Timeline} from "antd";
import {ClockCircleOutlined} from '@ant-design/icons';
import {useParams} from "react-router-dom";
import {useBooking} from "../../hooks/booking.hooks";
import CompanyLayout from "../../components/layouts/CompanyLayout";
import moment from "moment/moment";


const BookingTimeline = () => {
    const {id} = useParams<{ id: string }>();
    const {data: booking} = useBooking(id ?? "");
    return (
        <CompanyLayout>
            <div>
                <h1 style={{
                    textAlign: "center",
                    marginBottom: 50
                }}>{booking?.[0]?.fromStop?.location} - {booking?.[booking?.length - 1]?.toStop?.location}</h1>
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
        </CompanyLayout>
    );
}

export default BookingTimeline;