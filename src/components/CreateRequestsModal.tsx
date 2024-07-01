import {Button, Form, Input, message, Modal} from "antd";
import {useCreateRequest} from "../hooks/requests.hooks";
import TextArea from "antd/es/input/TextArea";

interface CreateRequestsModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
}

const CreateRequestsModal = ({isModalOpen, setIsModalOpen}: CreateRequestsModalProps) => {
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [form] = Form.useForm();

    const {mutate: createRequest} = useCreateRequest();

    const onFinish = (values: any) => {
        if(!values.name || !values.ownerEmail || !values.phone || !values.description || !values.ownerName){
            message.error("All fields are required");
            return;
        }
        createRequest({
            type: "COMPANY_APPLICATION",
            company: {
                id: 0,
                name: values.name,
                ownerEmail: values.ownerEmail,
                ownerName: values.ownerName,
                phone: values.phone,
                description: values.description,
            },
            status: "",
            requestDetails: ""
        }).finally(() => {
            setIsModalOpen(false);
            message.success("Request sent successfully. We will get back to you soon!");
        });
    };


    return (
        <>
            <Modal title="Send us a Partnership request!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} centered
                   footer={[null, null]}>
                <Form
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    layout={"vertical"}
                    style={{maxWidth: 500, minWidth: "30%", margin: "auto", padding: 30, borderRadius: 15}}

                >
                    <Form.Item name="name" label='Company Name'>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="description" label="Company Description">
                        <TextArea rows={2}/>
                    </Form.Item>
                    <Form.Item name="ownerName" label="Owner Name">
                        <Input/>
                    </Form.Item>

                    <Form.Item name="ownerEmail" label="Owner Email">
                        <Input/>
                    </Form.Item>

                    <Form.Item name="phone" label="Owner Phone">
                        <Input/>
                    </Form.Item>

                    <Form.Item>
                        <Button style={{marginTop: 10}} type="primary" htmlType="submit" block shape={"round"}>
                            Send request
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default CreateRequestsModal;