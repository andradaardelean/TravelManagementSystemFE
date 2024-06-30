import React, {useEffect, useState} from 'react';
import {
    Button,
    Card, Carousel,
    Checkbox,
    Col, DatePicker, Divider, Empty,
    Input,
    InputNumber,
    Layout, List,
    message,
    Modal,
    Row,
    Select,
    Switch,
    Typography
} from 'antd';
import {useNavigate} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import CreateRequestsModal from "../../components/CreateRequestsModal";
import dayjs from "dayjs";
import {FallOutlined, RiseOutlined, SearchOutlined, StopOutlined, UserOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import {SearchResult} from "../../types/interfaces/SeachResults";
import moment from "moment/moment";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {useRoutes} from "../../hooks/routes.hooks";
import {useStops} from "../../hooks/stops.hooks";
import {useCreateBooking} from "../../hooks/booking.hooks";

const {Header, Content, Footer} = Layout;
const {Title, Text} = Typography;

const testimonials = [
    {quote: "This app changed my life!", author: "Eric"},
    {quote: "An incredible experience!", author: "Andrada"},
    {quote: "Highly recommend to everyone!", author: "Topi"},
];

const {Search} = Input;

dayjs.extend(customParseFormat);

const {RangePicker} = DatePicker;

const dateFormat = 'YYYY-MM-DD';

const Homepage = () => {
    const [params, setParams] = useState({
        search: "",
        startLocation: "Oradea",
        endLocation: "Satu-Mare",
        startDate: moment("2024-12-18").format('YYYY-MM-DD'),
        endDate: moment("2024-12-19").format('YYYY-MM-DD'),
        passengersNo: "1",
        type: "all"
    });

    const {data: routes, isLoading: isDataLoading, refetch, isFetching} = useRoutes(params, {
        onError: (error: any) => {
            console.log(error);
        }
    });


    const navigate = useNavigate();

    const {data: stops} = useStops();

    const getTitle = (startLocation: string, endLocation: string) => {
        return (
            <div style={{textAlign: "center", fontWeight: "bold"}}>
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

    const {loginWithRedirect} = useAuth0();

    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

    return (
        <Layout className="layout">
            <CreateRequestsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            <Header className="header">
                <img src={'original-logo.jpeg'} style={{maxWidth: "100px", maxHeight: "100px", borderRadius: "6px"}}></img>
                <span className="logo">City Linker</span>
                <div>
                    <span style={{marginRight: 10}}>
                        <Button type="default" onClick={() => loginWithRedirect()}>Login</Button>
                    </span>
                    <span style={{marginRight: 10}}>
                        <Button type="default" onClick={() => navigate("/signup")}>Sign up</Button>
                    </span>
                </div>
            </Header>
            <Content style={{padding: '0 50px', marginTop: 64}}>
                <div className="home-pic" style={{ width: "100%", height:"95vh", display:"flex", justifyContent:"center"}}>
                    <h1 style={{ paddingTop: 320}}>Simplifying Travel Across Romania</h1>
                </div>
                <div className="site-layout-content">
                    <Modal
                       open={open}
                        onCancel={handleCancel}
                        confirmLoading={confirmLoading}
                        footer={[
                            null,null
                        ]}
                    >
                        <div style={{ justifyContent:"center", textAlign:"center"}}>
                           <h2>You need to be logged in to reserve this!</h2>
                            <h3>Please <Button type={"text"} onClick={() => loginWithRedirect()}>Login</Button> or <Button  type={"text"} danger onClick={() => navigate('/signup')}>Sign Up</Button></h3>
                        </div>
                    </Modal>
                    <div style={{padding: 10, textAlign: 'center'}}>
                        <Title level={3} style={{textAlign: 'center', marginTop: 20}}>Find Your Route</Title>

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

                        <span style={{ width: 50, height: 50, marginLeft: 30, fontSize: 22}}>
                        <SearchOutlined onClick={() => 
                        {
                            if(!params.startLocation || !params.endLocation || !params.startDate || !params.endDate || !params.passengersNo) {
                                message.error('Please fill in all the fields!');
                                return;
                        } else {
                            refetch()}}}
                          />
                            </span>
                    </div>

                    <div>
                        {isDataLoading || isFetching ?
                            [1].map((i) => <Card key={i} style={{width: "100%", marginTop: 16}}
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
                                <List
                                    itemLayout="horizontal"
                                    dataSource={routes}
                                    bordered
                                    style={{marginTop: 20, padding: 40,  fontSize: "20px"}}
                                    renderItem={(route: SearchResult, index: number) => (
                                        <List.Item  actions={[<Button type={"primary"} danger
                                                                      style={{marginTop: 10}}
                                                                      disabled={route.links[0].routeDTO.availableSeats === 0}
                                                                      onClick={() => {
                                                                          setSelectedRoute(route);
                                                                          showModal();
                                                                      }}>Reserve</Button>]}>
                                            <List.Item.Meta
                                                style={{fontSize: "20px"}}
                                                avatar={getAvatar(route.links[0].routeDTO)}
                                                title={moment(route.links[0].routeDTO.startDateTime).format('YYYY-MM-DD HH:mm')}
                                                description={<div>
                                                    Seats left: {route.links[0].routeDTO.availableSeats}
                                                </div>}
                                            />
                                            <div  style={{fontSize: "16px"}}>
                                                <span style={{ float:"left", marginRight: "500px"}}>Route: {route.links?.map((l) => l?.fromStop?.location).join(" -> ")}</span>
                                                <span style={{textAlign: "center"}}>
                                                {route.totalDistance} | {route.totalTime} |
                                                ${(route?.links?.[0]?.routeDTO?.pricePerSeat ?? 0) * Number(params?.passengersNo ?? 1)}
                                                    <br/>
                                            </span>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                        }
                    </div>

                    <Divider/>

                    <Row gutter={16} style={{margin: '70px 0'}}>
                        <Col span={24}>
                            <Title level={3} style={{textAlign: 'center', marginBottom: '20px'}}>What Our Users
                                Say</Title>
                        </Col>
                    </Row>

                    <Carousel autoplay arrows>
                        <div>
                            <div style={{
                                margin: 0,
                                padding: 30,
                                fontSize: "32px",
                                height: '160px',
                                color: 'black',
                                justifyContent: 'center',
                                textAlign: 'center',
                                backgroundColor: '#f0f2f5',
                            }}>
                                <Text style={{fontSize: "24px"}}>"{testimonials[0].quote}"</Text>
                                <br/>
                                <Text strong style={{fontSize: "14px"}}>~ {testimonials[0].author}</Text>
                            </div>
                        </div>

                        <div>
                            <div style={{
                                margin: 0,
                                padding: 30,
                                fontSize: "32px",
                                height: '160px',
                                color: 'black',
                                justifyContent: 'center',
                                textAlign: 'center',
                                backgroundColor: '#f0f2f5',
                            }}>
                                <Text style={{fontSize: "24px"}}>"{testimonials[1].quote}"</Text>
                                <br/>
                                <Text strong style={{fontSize: "14px"}}>~ {testimonials[1].author}</Text>
                            </div>
                        </div>

                        <div>
                            <div style={{
                                margin: 0,
                                padding: 30,
                                fontSize: "32px",
                                height: '160px',
                                color: 'black',
                                justifyContent: 'center',
                                textAlign: 'center',
                                backgroundColor: '#f0f2f5',
                            }}>
                                <Text style={{fontSize: "24px"}}>"{testimonials[2].quote}"</Text>
                                <br/>
                                <Text strong style={{fontSize: "14px"}}>~ {testimonials[2].author}</Text>
                            </div>
                        </div>

                    </Carousel>

                    <Divider/>


                    <Title level={3} style={{textAlign: 'center', marginBottom: '20px', marginTop: 100}}>You want to expand?</Title>
                    <Row gutter={16} style={{margin: '50px 0', justifyContent: "center"}}>
                        <Card className="card" title="Become a Partner" bordered={false}
                              style={{border: "1px solid #ff4d4f", backgroundColor: "#fff1f0"}}>
                            <Title level={1}>Partner with Us</Title>
                            <Text>Expand your business by partnering with us. Join our network and offer your services
                                to a broader audience, enhancing your visibility and customer base.</Text>
                            <br/>
                            <Button danger size={'large'} style={{marginTop: 16}}
                                    onClick={() => setIsModalOpen(true)}>Get in Touch</Button>
                        </Card>
                    </Row>

                </div>

            </Content>
            <Footer style={{textAlign: 'center', background: '#001529', color: '#fff'}}>
                <Row gutter={16} justify="center">
                    <Col>
                        <div>
                            <Title level={4} style={{ color: '#fff' }}>About Us</Title>
                            <Text style={{ color: '#fff' }}>We provide the best public transport services in the city. Our goal is to make your commute as comfortable and convenient as possible.</Text>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <Title level={4} style={{ color: '#fff' }}>Contact Us</Title>
                            <Text style={{ color: '#fff' }}>Email: support@transportapp.com</Text>
                            <br/>
                            <Text style={{ color: '#fff' }}>Phone: (123) 456-7890</Text>
                            <br/>
                            <Text style={{ color: '#fff' }}>Address: 123 Transport St, City, Country</Text>
                        </div>
                    </Col>
                </Row>
                <div style={{marginTop: '20px', color: '#fff'}}>©2024 MyApp. All Rights Reserved.</div>
            </Footer>
        </Layout>
    );
};

export default Homepage;