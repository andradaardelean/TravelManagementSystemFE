import React, {useEffect, useState} from "react";
import {
    BookOutlined,
    CarOutlined,
    CopyrightOutlined,
    LaptopOutlined,
    PieChartOutlined,
    UserOutlined
} from "@ant-design/icons";
import type {MenuProps} from "antd";
import {Avatar, Badge, Dropdown, Layout, Menu, Space, theme,} from "antd";
import {useAuth} from "../../context/AuthContext";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

const {Header, Content, Sider} = Layout;


interface PropsWithChildren {
    children: React.ReactNode;
}

const AdminLayout: React.FC<PropsWithChildren> = ({children}) => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const {user} = useAuth();
    const {logout} = useAuth0();
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    // DROPDOWN
    const items: MenuProps["items"] = [
        {
            key: "1",
            label: "View Profile",
            onClick: () => navigate("/profile"),
        },
        {
            key: "2",
            danger: true,
            label: "Logout",
            onClick: () => {
                logout();
            }
        },
    ];


    useEffect(() => {
        const fullPath = location.pathname;
        const basePath = fullPath.split("/")[1];
        switch (basePath) {
            case "overview":
                setSelectedKeys(["1"]);
                break;
            case "requests":
                setSelectedKeys(["2"]);
                break;
            case "users":
                setSelectedKeys(["3"]);
                break;
            case "companies":
                setSelectedKeys(["4"]);
                break;
            case "routes":
                setSelectedKeys(["5"]);
                break;
            case "bookings":
                setSelectedKeys(["6"]);
                break;
            default:
                break;
        }
    }, [location]);

    // MENU
    const sideMenu: MenuProps["items"] = [
        {
            key: "1",
            icon: <PieChartOutlined/>,
            label: "Overview",
            onClick: () => navigate("/overview"),
        },
        {
            key: "2",
            icon: <LaptopOutlined/>,
            label: "Requests",
            onClick: () => navigate("/requests"),
        },
        {
            key: "3",
            icon: <UserOutlined/>,
            label: "Users",
            onClick: () => navigate("/users"),
        },
        {
            key: "4",
            icon: <CopyrightOutlined/>,
            label: "Companies",
            onClick: () => navigate("/companies"),
        },
        {
            key: "5",
            icon: <CarOutlined/>,
            label: "Routes",
            onClick: () => navigate("/routes"),
        },
        {
            key: "6",
            icon: <BookOutlined/>,
            label: "Bookings",
            onClick: () => navigate("/bookings"),
        }
    ];

    return (
        <Layout>
            <Header
                style={{
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                    backgroundColor: "lightblue",
                }}
            >
                <div className="demo-logo"/>
                <div style={{marginLeft: "auto"}}>{user?.username}</div>
                <Dropdown menu={{items}}>
                    <a onClick={(e) => e.preventDefault()} href="/">
                        <Space size={24} style={{cursor: "pointer", marginLeft: 20}}>
                            <Badge count={1}>
                                <Avatar shape="square" icon={<UserOutlined/>}/>
                            </Badge>
                        </Space>
                    </a>
                </Dropdown>
            </Header>
            <Layout>
                <Sider width={200} style={{background: colorBgContainer}}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        selectedKeys={selectedKeys}
                        style={{height: "100%", borderRight: 0}}
                        items={sideMenu}
                    />
                </Sider>
                <Layout style={{padding: "0 24px 24px"}}>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: "80vh",
                            background: colorBgContainer,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
