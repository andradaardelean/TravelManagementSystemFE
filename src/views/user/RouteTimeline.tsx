import {Result, Timeline} from "antd";
import {ClockCircleOutlined} from '@ant-design/icons';
import UserLayout from "../../components/layouts/UserLayout";
import {useParams} from "react-router-dom";
import {useBooking} from "../../hooks/booking.hooks";
import moment from "moment/moment";


const RouteTimeline = () => {
    const {id} = useParams<{ id: string }>();
    const {data: booking} = useBooking(id ?? "");
    return (
        <UserLayout>
            <Result
                status="success"
                title="Successfully Booked!"
                subTitle={`Order number: ${id} Please take a look below at the timeline.`}
                extra={[
                    <div>
                        <Timeline
                            mode="alternate"
                            items={booking?.map((item) => ({
                                children: `${moment(item?.startTime).format('DD.MM HH:mm')}: ${item?.fromStop?.location}`,
                                dot: <ClockCircleOutlined style={{fontSize: '16px'}}/>,
                                color: 'green',
                            })).concat({
                                children: `${moment(booking?.[booking?.length - 1]?.endTime).format('DD.MM HH:mm')}:  ${booking?.[booking?.length - 1]?.toStop?.location}`,
                                dot: <ClockCircleOutlined style={{fontSize: '16px'}}/>,
                        color: 'green',
                        })}
                        />
                    </div>
                ]}
            />
        </UserLayout>
    );
}

export default RouteTimeline;