import React from "react";
import {Button, Form, Input} from "antd";
import {useLogin} from "../../hooks/auth.hooks";
import {Link} from "react-router-dom";
import CreateRequestsModal from "../../components/CreateRequestsModal";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const Login: React.FC = () => {
    const {mutate: loginMutation} = useLogin();
    const onFinish = (values: any) => {
        if (values.username && values.password)
            loginMutation({username: values.username, password: values.password});
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

    return (
        <div style={{
            justifyContent: "center",
            alignItems: "center",
            width: "198vh",
            height: "99vh",
            display: "flex",
        }}>

            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{required: true, message: "Please input your username!"}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{required: true, message: "Please input your password!"}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                >
                    <Link to={'/forgot-password'}>Forgot Password?</Link>
                </Form.Item>


                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" block htmlType="submit">
                        Login
                    </Button>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="dashed" block onClick={() => {
                        setIsModalOpen(true)
                    }} style={{marginTop: 16}}>
                        Make a request
                    </Button>
                </Form.Item>
            </Form>

            <CreateRequestsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        </div>
    );
};

export default Login;
