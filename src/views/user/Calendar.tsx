import React from 'react';
import type {Dayjs} from 'dayjs';
import type {BadgeProps, CalendarProps} from 'antd';
import {Badge, Calendar} from 'antd';
import {useAuth} from "../../context/AuthContext";
import {useBookingsByUser} from "../../hooks/booking.hooks";


const CalendarComponent: React.FC = () => {
    const {user} = useAuth();
    const {data: activeBookings} = useBookingsByUser({username: user?.username ?? ""});

    const getBookingsByDay = (day: number, value: Dayjs) => {
        return activeBookings?.filter((booking) => {
            const bookingDate = new Date(booking[0].startTime);
            return bookingDate.getDate() === day && bookingDate.getMonth() === value.month();
        });
    }


    const getColorByStatus = (date: string) => {
        const today = new Date();
        const bookingDate = new Date(date);
        if (bookingDate < today) return 'red';
        if (bookingDate.getDate() === today.getDate()) return 'green';
        return 'yellow';
    }

    const getListData = (value: Dayjs) => {
        let listData;
        switch (value.date()) {
            case 1:
                listData = getBookingsByDay(1, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 2:
                listData = getBookingsByDay(2, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 3:
                listData = getBookingsByDay(3, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 4:
                listData = getBookingsByDay(4, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 5:
                listData = getBookingsByDay(5, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 6:
                listData = getBookingsByDay(6, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 7:
                listData = getBookingsByDay(7, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 8:
                listData = getBookingsByDay(8, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 9:
                listData = getBookingsByDay(9, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 10:
                listData = getBookingsByDay(10, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 11:
                listData = getBookingsByDay(11, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 12:
                listData = getBookingsByDay(12, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 13:
                listData = getBookingsByDay(13, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 14:
                listData = getBookingsByDay(14, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 15:
                listData = getBookingsByDay(15, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 16:
                listData = getBookingsByDay(16, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 17:
                listData = getBookingsByDay(17, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 18:
                listData = getBookingsByDay(18, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 19:
                listData = getBookingsByDay(19, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 20:
                listData = getBookingsByDay(20, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 21:
                listData = getBookingsByDay(21, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 22:
                listData = getBookingsByDay(22, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 23:
                listData = getBookingsByDay(23, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 24:
                listData = getBookingsByDay(24, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 25:
                listData = getBookingsByDay(25, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 26:
                listData = getBookingsByDay(26, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 27:
                listData = getBookingsByDay(27, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 28:
                listData = getBookingsByDay(28, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 29:
                listData = getBookingsByDay(29, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 30:
                listData = getBookingsByDay(30, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            case 31:
                listData = getBookingsByDay(31, value)?.map((booking) => ({
                    type: getColorByStatus(booking[0].startTime),
                    content: `Booking ID: ${booking[0].id}`,
                }));
                break;
            default:
        }
        return listData || [];
    };

    const getMonthData = (value: Dayjs) => {
        if (value.month() === 8) {
            return 1234;
        }
    };

    const monthCellRender = (value: Dayjs) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type as BadgeProps['status']} text={item.content}/>
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };


    return <Calendar cellRender={cellRender}/>;
};

export default CalendarComponent;