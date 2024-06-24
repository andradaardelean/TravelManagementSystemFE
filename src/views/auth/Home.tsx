import React from 'react';
import {Button, Card, Col, Layout, Row, Typography} from 'antd';
import {useNavigate} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import CreateRequestsModal from "../../components/CreateRequestsModal";

const {Header, Content, Footer} = Layout;
const {Title, Text} = Typography;

const testimonials = [
    {quote: "This app changed my life!", author: "Eric"},
    {quote: "An incredible experience!", author: "Andrada"},
    {quote: "Highly recommend to everyone!", author: "Topi"},
];

const Homepage = () => {
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
                        <Button type="default" onClick={() => loginWithRedirect()}>Sign up</Button>
                    </span>
                </div>
            </Header>
            <Content style={{padding: '0 50px', marginTop: 64}}>
                <div className="home-pic" style={{ width: "100%", height:"95vh", display:"flex", justifyContent:"center"}}>
                    <h1 style={{ paddingTop: 320}}>Simplifying Travel Across Romania</h1>
                </div>
                <div className="site-layout-content">
                    <Row gutter={16} style={{margin: '20px 0'}}>
                        <Col span={12}>
                            <Card className="card" title="Become a Traveller" bordered={false}
                                  style={{border: "1px solid #1890ff", backgroundColor: "#e6f7ff"}}>
                                <Title level={1}>Join Us</Title>
                                <Text>Experience the best services by joining our app. Whether you're commuting or planning a trip, our app provides reliable and efficient transport solutions tailored to your needs.</Text>
                                <br/>
                                <Button type="primary" size={'large'} style={{marginTop: 16}}
                                        onClick={() => loginWithRedirect()}>Sign Up</Button>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card className="card" title="Become a Partner" bordered={false}
                                  style={{border: "1px solid #ff4d4f", backgroundColor: "#fff1f0"}}>
                                <Title level={1}>Partner with Us</Title>
                                <Text>Expand your business by partnering with us. Join our network and offer your services to a broader audience, enhancing your visibility and customer base.</Text>
                                <br/>
                                <Button danger size={'large'} style={{marginTop: 16}}
                                        onClick={() => setIsModalOpen(true)}>Get in Touch</Button>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{margin: '50px 0'}}>
                        <Col span={24}>
                            <Title level={3} style={{textAlign: 'center', marginBottom: '20px'}}>What Our Users
                                Say</Title>
                        </Col>
                        {testimonials.map((testimonial, index) => (
                            <Col span={8} key={index}>
                                <Card className="testimonial-card">
                                    <Text>"{testimonial.quote}"</Text>
                                    <br/>
                                    <Text strong>- {testimonial.author}</Text>
                                </Card>
                            </Col>
                        ))}
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