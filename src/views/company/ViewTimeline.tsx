import {Skeleton, Timeline} from "antd";
import {ClockCircleOutlined} from '@ant-design/icons';
import {useParams} from "react-router-dom";
import {useBooking} from "../../hooks/booking.hooks";
import CompanyLayout from "../../components/layouts/CompanyLayout";
import moment from "moment/moment";


const BookingTimeline = () => {
    const {id} = useParams<{ id: string }>();
    const {data: booking, isLoading, isFetching} = useBooking(id ?? "");
    return (
        <CompanyLayout>
            <Skeleton avatar title={false} loading={isFetching || isLoading} active>
            <div>
                <h1 style={{
                    textAlign: "center",
                    marginBottom: 50
                }}>{booking?.[0]?.fromStop?.location} - {booking?.[booking?.length - 1]?.toStop?.location}</h1>
                <Timeline
                    mode="alternate"
                    items={booking?.map((item) => ({
                            children: `${moment(item?.startTime).format('DD.MM HH:mm')} | ${item?.fromStop?.location} | ${item?.durationText} | ${item?.distanceText}`,
                            dot: <ClockCircleOutlined style={{fontSize: '16px'}}/>,
                            color: 'green',
                        })).concat({
                            children: `${moment(booking?.[booking?.length - 1]?.endTime).format('DD.MM HH:mm')} | ${booking?.[booking?.length - 1]?.toStop?.location}`,
                            dot: <ClockCircleOutlined style={{fontSize: '16px'}}/>,
                            color: 'green',
                        })}
                />
            </div>
            </Skeleton>
        </CompanyLayout>
    );
}

export default BookingTimeline;