import {
    Button,
    Card,
    Checkbox,
    DatePicker,
    Divider,
    Empty,
    Input,
    InputNumber,
    message,
    Modal,
    Select,
    Space,
    Switch
} from "antd";
import {useEffect, useState} from "react";
import {FallOutlined, RiseOutlined, StopOutlined, UserOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {useStops} from "../../hooks/stops.hooks";
import {SearchResult} from "../../types/interfaces/SeachResults";
import {useCreateBooking} from "../../hooks/booking.hooks";
import UserLayout from "../../components/layouts/UserLayout";
import {useRoutes} from "../../hooks/routes.hooks";

const {Search} = Input;

dayjs.extend(customParseFormat);

const {RangePicker} = DatePicker;

const dateFormat = 'YYYY-MM-DD';

const SearchPageV2 = () => {
    const [params, setParams] = useState({
        search: "",
        startLocation: "Cluj-Napoca",
        endLocation: "Oradea",
        startDate: moment("2024-12-18").format('YYYY-MM-DD'),
        endDate: moment("2024-12-19").format('YYYY-MM-DD'),
        passengersNo: "1",
        type: "all"
    });

    const {data: routes, isLoading: isDataLoading, refetch, isFetching} = useRoutes(params);

    const navigate = useNavigate();

    const {data: stops} = useStops();

    const getTitle = (startLocation: string, endLocation: string) => {
        return (
            <div>
                {startLocation} <span> -&gt; </span> {endLocation}
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

    const {mutate: createBooking, data: bookingId} = useCreateBooking();

    useEffect(() => {
        if (bookingId) {
            navigate(`/timeline/${bookingId}`);
        }
    }, [bookingId, navigate]);

    const getAvatar = (routeDTO: any) => {
        if (routeDTO.availableSeats === 0) {
            return <StopOutlined style={{color: "red", fontSize: "14px"}}/>
        }
        if (routeDTO.availableSeats > routeDTO.totalSeats / 2) {
            return <FallOutlined style={{color: "green", fontSize: "14px"}}/>
        } else {
            return <RiseOutlined style={{color: "red", fontSize: "14px"}}/>
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
                confirmLoading={confirmLoading}
                footer={[null, null]}
            >
                <div>
                    <p>Please fill in your details to book your ticket.</p>
                    <Input placeholder="Full Name" style={{marginBottom: 10}}/>
                    <Input placeholder="Email Address" style={{marginBottom: 10}}/>
                    <InputNumber
                        min={1}
                        max={10}
                        defaultValue={Number(params.passengersNo)}
                        disabled={true}
                        style={{width: '100%', marginBottom: 10}}
                    />
                    <Input placeholder="Credit Card Number" style={{marginBottom: 10}}/>
                    <Input placeholder="Expiry Date (MM/YY)" style={{marginBottom: 10}}/>
                    <Input placeholder="CVV" style={{marginBottom: 10}}/>
                    <Checkbox style={{marginBottom: 10}}>
                        I agree to the <a href="#terms">Terms and Conditions</a>
                    </Checkbox>
                </div>
                <div style={{display: "flex"}}>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button type="primary" style={{marginLeft: "auto", float: "right"}} onClick={() => {
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
                </div>
            </Modal>
            <div style={{padding: 10}}>
                <Search placeholder="Search by destination, arrival, date..." loading={isDataLoading || isFetching}
                        enterButton
                        size={"large"} value={params.search}
                        onChange={(e) => {
                            setParams((prev) => ({
                                ...prev,
                                search: e.target.value
                            }));
                        }}
                        onSearch={(value) => {
                            refetch();
                        }}
                        onClick={() => {
                            refetch();
                        }}/>

                {/* DEPARTURE */}
                <Select
                    showSearch
                    style={{width: 200, marginTop: 10}}
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
                    style={{width: 200, marginTop: 10, marginLeft: 10}}
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
                    style={{marginTop: 10, marginLeft: 10}}
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
                <InputNumber min={1} max={10} addonBefore={<UserOutlined/>}
                             style={{width: '10%', marginTop: 10, marginLeft: 10}}
                             value={Number(params.passengersNo)}
                             onChange={(e) => {
                                 if (e) {
                                     setParams((prev) => ({
                                         ...prev,
                                         passengersNo: e.toString()
                                     }));
                                 }
                             }}/>
                <Switch style={{marginLeft: 32}} onChange={handleRouteType} checkedChildren="All Routes"
                        unCheckedChildren="Shortest Route" checked={params.type === 'all'}/>
            </div>

            <div>
                {isDataLoading || isFetching ?
                    [1, 2, 3].map((i) => <Card key={i} style={{width: "100%", marginTop: 16}}
                                               loading={isDataLoading || isFetching}>
                        <Meta
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>) :
                    !routes || routes?.length === 0 ? (
                            <Empty
                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                imageStyle={{height: 60}}
                                description={
                                    <span>No routes found!
                            </span>
                                }
                            >
                            </Empty>
                        ) :
                        <Space style={{display: "flex", flexWrap: "wrap"}}>
                            {routes?.map((route: SearchResult, index: number) => (
                                <Card key={index}
                                      title={getTitle(params.startLocation, params.endLocation)}
                                      bordered={true} hoverable
                                      style={{width: "100%", marginTop: 16, justifyContent: 'center'}}>
                                    <Meta
                                        avatar={getAvatar(route.links[0].routeDTO)}
                                        title={moment(route.links[0].routeDTO.startDateTime).format('YYYY-MM-DD HH:mm')}
                                        description={<div>
                                            Seats: {route.links[0].routeDTO.availableSeats}/{route.links[0].routeDTO.totalSeats}
                                        </div>}
                                    />
                                    <Divider></Divider>
                                    <p> {route.totalDistance} in {route.totalTime}</p>

                                    <p>Total:
                                        ${route.links[0].routeDTO.pricePerSeat * Number(params.passengersNo)}</p>
                                    <Button type={"dashed"}
                                            disabled={route.links[0].routeDTO.availableSeats === 0}
                                            onClick={() => {
                                                setSelectedRoute(route);
                                                showModal();
                                            }}>Reserve</Button>
                                </Card>
                            ))}
                        </Space>
                }
            </div>
        </UserLayout>
    );

}

export default SearchPageV2;