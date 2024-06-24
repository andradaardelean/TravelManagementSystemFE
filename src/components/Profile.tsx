import React from 'react';
import { useAuth } from "../context/AuthContext";
import { UserRoles } from "../types/constants";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import CompanyLayout from "./layouts/CompanyLayout";
import { useBookingsByUser } from "../hooks/booking.hooks";
import { Avatar, List, Card, Skeleton, Row, Col, Typography, Divider, Tag } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Profile = () => {
    const { user } = useAuth();
    const { data: activeBookings, isLoading, isError } = useBookingsByUser({ username: user?.username ?? "" });

    const mockProfileDetails = {
        email: "user@example.com",
        phone: "123-456-7890",
        address: "123 Main St, Anytown, USA",
        company: "Example Corp",
        adminNote: "Administrator access granted since 2021."
    };

    const renderBookings = () => (
        <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={activeBookings || []}
            renderItem={item => (
                <List.Item>
                    <Card title={item.bookingTitle}>
                        <p>Booking Date: {item.date}</p>
                        <p>Location: {item.location}</p>
                        <p>Status: <Tag color={item.status === "Confirmed" ? "green" : "red"}>{item.status}</Tag></p>
                    </Card>
                </List.Item>
            )}
        />
    );

    const renderAdminProfile = () => (
        <AdminLayout>
            <Row gutter={16}>
                <Col span={8}>
                    <Avatar size={100} icon={<UserOutlined />} />
                </Col>
                <Col span={16}>
                    <Title level={2}>{user?.username}</Title>
                    <Text strong>Email: </Text>{mockProfileDetails.email}<br />
                    <Text strong>Phone: </Text>{mockProfileDetails.phone}<br />
                    <Text strong>Address: </Text>{mockProfileDetails.address}<br />
                    <Divider />
                    <Text>{mockProfileDetails.adminNote}</Text>
                </Col>
            </Row>
        </AdminLayout>
    );

    const renderCompanyProfile = () => (
        <CompanyLayout>
            <Row gutter={16}>
                <Col span={8}>
                    <Avatar size={100} icon={<UserOutlined />} />
                </Col>
                <Col span={16}>
                    <Title level={2}>{user?.username}</Title>
                    <Text strong>Email: </Text>{mockProfileDetails.email}<br />
                    <Text strong>Phone: </Text>{mockProfileDetails.phone}<br />
                    <Text strong>Address: </Text>{mockProfileDetails.address}<br />
                    <Text strong>Company: </Text>{mockProfileDetails.company}<br />
                </Col>
            </Row>
        </CompanyLayout>
    );

    const renderUserProfile = () => (
        <UserLayout>
            <Row gutter={16}>
                <Col span={8}>
                    <Avatar size={100} icon={<UserOutlined />} />
                </Col>
                <Col span={16}>
                    <Title level={3}>Username: {user?.username}</Title>
                </Col>
            </Row>
            <Divider />
            <Text strong>Role: </Text>{user?.userType}<br />
            <Text strong>Email: </Text>{mockProfileDetails.email}<br />
            <Text strong>Phone: </Text>{mockProfileDetails.phone}<br />
            <Text strong>Address: </Text>{mockProfileDetails.address}<br />
            <Title level={4}>Bookings: {activeBookings?.length}</Title>
            {isLoading ? <Skeleton active /> : renderBookings()}
        </UserLayout>
    );

    if (user?.userType === UserRoles.ADMIN) {
        return renderAdminProfile();
    } else if (user?.userType === UserRoles.COMPANYEMPLOYEE) {
        return renderCompanyProfile();
    } else {
        return renderUserProfile();
    }
}

export default Profile;