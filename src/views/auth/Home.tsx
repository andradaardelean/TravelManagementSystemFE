import React from 'react';
import {Button, Card, Col, Layout, Row, Typography} from 'antd';
import {useNavigate} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import CreateRequestsModal from "../../components/CreateRequestsModal";

const {Header, Content, Footer} = Layout;
const {Title, Text} = Typography;

const testimonials = [
    {quote: "This app changed my life!", author: "User A"},
    {quote: "An incredible experience!", author: "User B"},
    {quote: "Highly recommend to everyone!", author: "User C"},
];

const Homepage = () => {
    const navigate = useNavigate();
    const {loginWithRedirect} = useAuth0();

    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

    return (
        <Layout className="layout">
            <CreateRequestsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            <Header className="header">
                <div className="logo">Travel Management System</div>
                <div>
                    <span style={{marginRight: 10}}>
                        <Button type="primary" onClick={() => loginWithRedirect()}>Login</Button>
                    </span>
                    <span style={{marginRight: 10}}>
                        <Button type="primary" onClick={() => loginWithRedirect()}>Sign up</Button>
                    </span>
                    <span style={{marginRight: 10}}>
                        <Button type="primary" onClick={() => navigate('/my-reservations')}>Partners</Button>
                    </span>
                    <span style={{marginRight: 10}}>
                        <Button type="primary" onClick={() => navigate('/profile')}>About us</Button>
                    </span>
                    <span style={{marginRight: 10}}>
                        <Button type="primary" onClick={() => navigate('/profile')}>Contact us</Button>
                    </span>
                </div>
            </Header>
            <Content style={{padding: '0 50px', marginTop: 64}}>
                <div className="site-layout-content">
                    <Row gutter={16} style={{margin: '20px 0'}}>
                        <Col span={12}>
                            <Card className="card" title="Join as a User" bordered={false}
                                  style={{border: "1px solid blue"}}>
                                <Title level={1}>Join Us</Title>
                                <Text>Experience the best services by joining our app.</Text>
                                <br/>
                                <Button type="primary" size={'large'} style={{marginTop: 16}}
                                        onClick={() => loginWithRedirect()}>Sign Up</Button>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card className="card" title="Become a Partner" bordered={false}
                                  style={{border: "1px solid red"}}>
                                <Title level={1}>Partner with Us</Title>
                                <Text>Expand your business by partnering with us.</Text>
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
            <Footer style={{textAlign: 'center'}}>
                <Row gutter={16} justify="center">
                    <Col>
                        <img className="footer-image" src="https://via.placeholder.com/150" alt="Placeholder"/>
                    </Col>
                    <Col>
                        <img className="footer-image" src="https://via.placeholder.com/150" alt="Placeholder"/>
                    </Col>
                    <Col>
                        <img className="footer-image" src="https://via.placeholder.com/150" alt="Placeholder"/>
                    </Col>
                </Row>
                <div style={{marginTop: '20px'}}>©2024 MyApp. All Rights Reserved.</div>
            </Footer>
        </Layout>
    );
};

export default Homepage;