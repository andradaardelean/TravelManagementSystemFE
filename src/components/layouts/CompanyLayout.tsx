import React, {useEffect, useState} from "react";
import {BookOutlined, CarOutlined, PieChartOutlined, UserOutlined} from "@ant-design/icons";
import type {MenuProps} from "antd";
import {Avatar, Badge, Breadcrumb, Dropdown, Layout, Menu, Space, theme,} from "antd";
import {useAuth} from "../../context/AuthContext";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

const {Header, Content, Sider} = Layout;


interface PropsWithChildren {
    children: React.ReactNode;
}

const CompanyLayout: React.FC<PropsWithChildren> = ({children}) => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const {user} = useAuth();
    const {logout} = useAuth0();
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

    const [isCompanyOwner, setIsCompanyOwner] = useState(user?.username === user?.company)

    useEffect(() => {
        if (user) {
            setIsCompanyOwner(user?.name === user?.company)
        }
    }, [user]);

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
                navigate('/')
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
            // case "my-requests":
            //     setSelectedKeys(["2"]);
            //     break;
            case "users":
                setSelectedKeys(["3"]);
                break;
            case "routes":
                setSelectedKeys(["4"]);
                break;
            case 'bookings':
                setSelectedKeys(["5"]);
                break;
            default:
                break;
        }

        setBreadcrumb(fullPath.split("/"));
    }, [location]);

    // MENU
    const sideMenu: MenuProps["items"] = [
        {
            key: "1",
            icon: <PieChartOutlined/>,
            label: "Overview",
            onClick: () => navigate("/overview"),
        },
        // {
        //     key: "2",
        //     icon: <LaptopOutlined/>,
        //     label: "Requests",
        //     onClick: () => navigate("/my-requests"),
        // },
        {
            key: "3",
            icon: <UserOutlined/>,
            label: "Users",
            onClick: () => navigate("/users"),
        },
        {
            key: "4",
            icon: <CarOutlined/>,
            label: "Routes",
            onClick: () => navigate("/routes"),
        },
        {
            key: "5",
            icon: <BookOutlined/>,
            label: "Bookings",
            onClick: () => navigate("/bookings"),
        },
    ];

    const constructHref = (item: string) => {
        return breadcrumb.slice(0, breadcrumb.indexOf(item) + 1).join("/");
    };

    const isHrefDisabled = (item: string) => {
        return breadcrumb.indexOf(item) === breadcrumb.length - 1;
    };

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
                <div
                    style={{marginLeft: "auto"}}>{isCompanyOwner ? `${user?.company} OWNER` : user?.username}</div>
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
                    <Breadcrumb style={{margin: "16px 0"}}>
                        {breadcrumb.map((item) => (
                            <Breadcrumb.Item
                                key={item}
                                href={isHrefDisabled(item) ? undefined : constructHref(item)}
                            >
                                {item}
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
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

export default CompanyLayout;
