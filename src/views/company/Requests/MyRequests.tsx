import {Button, Col, Row, Tabs} from "antd";
import ActiveRequests from "./ActiveRequests";
import ResolvedRequests from "./ResolvedRequests";
import CompanyLayout from "../../../components/layouts/CompanyLayout";
import CreateRequestsModal from "../../../components/CreateRequestsModal";
import {useState} from "react";

const MyRequests = () => {
    const tabs = [
        {
            label: "Active",
            key: "1",
            children: <ActiveRequests status={'active'}/>,
        },
        {
            label: "Resolved",
            key: "2",
            children: <ResolvedRequests status={'resolved'}/>,
        },
    ]

    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <CompanyLayout>
            <CreateRequestsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            <Row justify="space-between" align="middle">
                <Col>
                    <h1>Your Requests</h1>
                </Col>
                <Col>
                    <Button type="primary" onClick={() => {
                        setIsModalOpen(true)
                    }} style={{marginBottom: 16}}>
                        Make a request
                    </Button>
                </Col>
            </Row>
            <Tabs
                defaultActiveKey="1"
                centered
                items={tabs}
            />
        </CompanyLayout>

    )
}

export default MyRequests;