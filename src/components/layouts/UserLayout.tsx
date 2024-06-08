import React, {useEffect, useState} from "react";
import {BookOutlined, HomeOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";
import type {MenuProps} from "antd";
import {Avatar, Badge, Dropdown, Layout, Menu, Space, theme,} from "antd";
import {useAuth} from "../../context/AuthContext";
import {useLocation, useNavigate} from "react-router-dom";
import {Footer} from "antd/es/layout/layout";
import {useAuth0} from "@auth0/auth0-react";

const {Header, Content, Sider} = Layout;


interface PropsWithChildren {
    children: React.ReactNode;
}

const UserLayout: React.FC<PropsWithChildren> = ({children}) => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const {user} = useAuth();
    const {logout} = useAuth0();

    const navigate = useNavigate();
    const location = useLocation();

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [breadcrumb, setBreadcrumb] = useState<string[]>([]);

    useEffect(() => {
        const fullPath = location.pathname;
        const basePath = fullPath.split("/")[1];
        switch (basePath) {
            case "home":
                setSelectedKeys(["1"]);
                break;
            case "search":
                setSelectedKeys(["2"]);
                break;
            case "my-reservations":
                setSelectedKeys(["3"]);
                break;
            // case "my-requests":
            //     setSelectedKeys(["4"]);
            //     break;
            default:
                break;
        }

        setBreadcrumb(fullPath.split("/"));
    }, [location]);


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
            onClick: () => logout(),
        },
    ];

    // MENU
    const sideMenu: MenuProps["items"] = [
        {
            key: "1",
            icon: <HomeOutlined/>,
            label: "Home",
            onClick: () => navigate("/home"),
        },
        {
            key: "2",
            icon: <SearchOutlined/>,
            label: "Search",
            onClick: () => navigate("/search"),
        },
        {
            key: "3",
            icon: <BookOutlined/>,
            label: "Reservations",
            onClick: () => navigate("/my-reservations"),
        },
        // {
        //     key: "4",
        //     icon: <UserOutlined/>,
        //     label: "Requests",
        //     onClick: () => navigate("/my-requests"),
        // },
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
                <div style={{marginLeft: "auto", color: "white"}}>Welcome back, {user?.username ?? "N/A"}</div>
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
                <Sider width={160} style={{background: colorBgContainer}}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        selectedKeys={selectedKeys}
                        style={{height: "100%", borderRight: 0}}
                        items={sideMenu}
                    />
                </Sider>
                <Layout style={{padding: "0 24px 0px"}}>
                    {/*<Breadcrumb style={{margin: "16px 0"}}>*/}
                    {/*    {breadcrumb.map((item) => (*/}
                    {/*        <Breadcrumb.Item*/}
                    {/*            key={item}*/}
                    {/*            href={isHrefDisabled(item) ? undefined : constructHref(item)}*/}
                    {/*        >*/}
                    {/*            {item}*/}
                    {/*        </Breadcrumb.Item>*/}
                    {/*    ))}*/}
                    {/*</Breadcrumb>*/}
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
            <Footer style={{textAlign: 'center'}}>
                <div>Contact: Ardelean Andrada</div>
            </Footer>
        </Layout>
    );
};

export default UserLayout;
