import {
    Button,
    Card,
    Checkbox,
    DatePicker,
    Divider,
    Empty,
    Input,
    InputNumber,
    List,
    message,
    Modal,
    Select,
    Space,
    Switch
} from "antd";
import { useEffect, useState } from "react";
import { FallOutlined, RiseOutlined, StopOutlined, UserOutlined, SearchOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useStops } from "../../hooks/stops.hooks";
import { SearchResult } from "../../types/interfaces/SeachResults";
import { useCreateBooking } from "../../hooks/booking.hooks";
import UserLayout from "../../components/layouts/UserLayout";
import { useRoutes } from "../../hooks/routes.hooks";

const { Search } = Input;

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';

const SearchPageV2 = () => {
    const [params, setParams] = useState({
        search: "",
        startLocation: "Oradea",
        endLocation: "Satu-Mare",
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        passengersNo: "1",
        type: "all"
    });

    const { data: routes, isLoading: isDataLoading, refetch, isFetching } = useRoutes(params, {
        onError: (error: any) => {
            console.log(error);
        }
    });

    const navigate = useNavigate();

    const { data: stops } = useStops();

    const getTitle = (startLocation: string, endLocation: string) => {
        return (
            <div style={{ textAlign: "center", fontWeight: "bold" }}>
                {startLocation} <span> : </span> {endLocation}
            </div>
        )
    }

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const [selectedRoute, setSelectedRoute] = useState<SearchResult | undefined>(undefined);

    const { mutate: createBooking, data: bookingId } = useCreateBooking();

    useEffect(() => {
        if (bookingId) {
            navigate(`/timeline/${bookingId}`);
        }
    }, [bookingId, navigate]);

    const getAvatar = (routeDTO: any) => {
        if (routeDTO.availableSeats === 0) {
            return <StopOutlined style={{ color: "red", fontSize: "14px" }} />
        }
        if (routeDTO.availableSeats > routeDTO.totalSeats / 2) {
            return <FallOutlined style={{ color: "green", fontSize: "14px" }} />
        } else {
            return <RiseOutlined style={{ color: "red", fontSize: "14px" }} />
        }
    }

    const handleRouteType = (checked: boolean) => {
        setParams((prev) => ({
            ...prev,
            type: checked ? 'all' : 'shortest'
        }));
    }

    return (
        <UserLayout>
            <Divider>Search</Divider>
            <Modal
                title={`Reserve Ticket for ${selectedRoute?.links[0].routeDTO.startLocation} to ${selectedRoute?.links[0].routeDTO.endLocation}`}
                open={open}
                onCancel={handleCancel}
                confirmLoading={confirmLoading}
                centered
                footer={[
                    null,
                    <Button type="primary" onClick={() => {
                        createBooking({
                            booking: {
                                id: 0,
                                passengersNo: Number(params.passengersNo),
                                type: "RESERVED",
                            },
                            links: selectedRoute?.links ?? []
                        }).then(() => {
                            message.success('Booking created successfully!');
                            setConfirmLoading(true);
                        }).catch(() => {
                            message.error('Failed to create booking!');
                        });
                    }}>Confirm Booking</Button>
                ]}
            >
                <div>
                    <p>Please fill in your details to book your ticket.</p>
                    <Input placeholder="Full Name" style={{ marginBottom: 10 }} />
                    <Input placeholder="Email Address" style={{ marginBottom: 10 }} />
                    <InputNumber
                        min={1}
                        max={10}
                        defaultValue={Number(params.passengersNo)}
                        disabled={true}
                        style={{ width: '100%', marginBottom: 10 }}
                    />
                    <Input placeholder="Credit Card Number" style={{ marginBottom: 10 }} />
                    <Input placeholder="Expiry Date (MM/YY)" style={{ marginBottom: 10 }} />
                    <Input placeholder="CVV" style={{ marginBottom: 10 }} />
                    <Checkbox style={{ marginBottom: 10 }}>
                        I agree to the <a href="#terms">Terms and Conditions</a>
                    </Checkbox>
                </div>
            </Modal>
            <div style={{ padding: 10 }}>
                {/* DEPARTURE */}
                <Select
                    showSearch
                    style={{ width: 200, marginTop: 10 }}
                    placeholder="Search a Destination"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    onChange={(e) => {
                        setParams((prev) => ({
                            ...prev,
                            startLocation: e
                        }));
                    }}
                    options={stops?.map((stop) => ({
                        value: stop.location,
                        label: stop.location,
                    }))}
                    defaultValue={params.startLocation}
                />

                {/* ARRIVAL */}
                <Select
                    showSearch
                    style={{ width: 200, marginTop: 10, marginLeft: 10 }}
                    placeholder="Search an Arrival"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    onChange={(e) => {
                        setParams((prev) => ({
                            ...prev,
                            endLocation: e
                        }));
                    }}
                    options={stops?.map((stop) => ({
                        value: stop.location,
                        label: stop.location,
                    }))}
                    defaultValue={params.endLocation}
                />

                {/* DATE */}
                <RangePicker
                    style={{ marginTop: 10, marginLeft: 10 }}
                    defaultValue={[dayjs(params.startDate, dateFormat), dayjs(params.endDate, dateFormat)]}
                    format={dateFormat}
                    allowEmpty={[false, false]}
                    onChange={(e, dateString) => {
                        setParams((prev) => ({
                            ...prev,
                            startDate: dateString[0],
                            endDate: dateString[1]
                        }));
                    }}
                />

                {/* NR OF PASSENGERS */}
                <InputNumber min={1} max={10} addonBefore={<UserOutlined />}
                    style={{ width: '10%', marginTop: 10, marginLeft: 10 }}
                    value={Number(params.passengersNo)}
                    onChange={(e) => {
                        if (e) {
                            setParams((prev) => ({
                                ...prev,
                                passengersNo: e.toString()
                            }));
                        }
                    }} />
                <Switch style={{ marginLeft: 32 }} onChange={handleRouteType} checkedChildren="All Routes"
                    unCheckedChildren="Shortest Route" checked={params.type === 'all'} />


                <span style={{ width: 50, height: 50, marginLeft: 30, fontSize: 22 }}>
                    <SearchOutlined onClick={() => refetch()} />
                </span>
            </div>

            <div>
                {isDataLoading || isFetching ?
                    [1].map((i) => <Card key={i} style={{ width: "90%", marginTop: 16 }}
                        loading={isDataLoading || isFetching}>
                        <Meta
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>) :
                    !routes || routes?.length === 0 ? (
                        <Empty
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{ height: 60 }}
                            description={
                                <span>No routes found!
                                </span>
                            }
                        >
                        </Empty>
                    ) :
                        <List
                            itemLayout="horizontal"
                            dataSource={routes}
                            bordered
                            style={{ marginTop: 20, padding: 40, fontSize: "20px" }}
                            renderItem={(route: SearchResult, index: number) => (
                                <List.Item actions={[<Button type={"primary"} danger
                                    style={{ marginTop: 10 }}
                                    disabled={route.links[0].routeDTO.availableSeats === 0}
                                    onClick={() => {
                                        setSelectedRoute(route);
                                        showModal();
                                    }}>Reserve</Button>]}>
                                    <List.Item.Meta
                                        style={{ fontSize: "20px" }}
                                        avatar={getAvatar(route.links[0].routeDTO)}
                                        title={moment(route.links[0].routeDTO.startDateTime).format('YYYY-MM-DD HH:mm')}
                                        description={<div>
                                            Seats left: {route.links[0].routeDTO.availableSeats}
                                        </div>}
                                    />
                                    <div style={{ fontSize: "16px" }}>
                                        <span style={{ float: "left", marginRight: "400px" }}>Route: {route.links?.map((l) => l?.fromStop?.location).join(" -> ")}</span>
                                        <span style={{ textAlign: "center" }}>
                                            {route.totalDistance} | {route.totalTime} |
                                            ${(route?.links?.[0]?.routeDTO?.pricePerSeat ?? 0) * Number(params?.passengersNo ?? 1)}
                                            <br />
                                        </span>
                                    </div>
                                </List.Item>
                            )}
                        />
                }
            </div>
        </UserLayout>
    );

}

export default SearchPageV2;