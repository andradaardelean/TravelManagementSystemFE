import {Result, Timeline} from "antd";
import {ClockCircleOutlined} from '@ant-design/icons';
import UserLayout from "../../components/layouts/UserLayout";
import {useParams} from "react-router-dom";
import {useBooking} from "../../hooks/booking.hooks";


const RouteTimeline = () => {
    const {id} = useParams<{ id: string }>();
    const {data: booking} = useBooking(id ?? "");
    return (
        <UserLayout>
            <Result
                status="success"
                title="Successfully Booked!"
                subTitle={`Order number: ${id} Please take a look below for the timeline.`}
                extra={[
                    <div>
                        <Timeline
                            mode="alternate"
                            items={booking?.map((item) => ({
                                children: `${item.startTime}: ${item.fromStop.location}`,
                                dot: <ClockCircleOutlined style={{fontSize: '16px'}}/>,
                                color: 'green',
                            }))
                            }
                        />
                    </div>
                ]}
            />

        </UserLayout>
    );
}

export default RouteTimeline;