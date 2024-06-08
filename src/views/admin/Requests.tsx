import {Tabs} from "antd";
import AdminLayout from "../../components/layouts/AdminLayout";
import {RequestTabs} from "../../types/constants";
import AllRequestsTab from "./AdminRequests/AllRequestsTab";
import PendingRequestsTab from "./AdminRequests/PendingRequestsTab";
import ApprovedRequestsTab from "./AdminRequests/ApprovedRequestsTab";
import RejectedRequestsTab from "./AdminRequests/RejectedRequestsTab";

const Requests = () => {
    const items = [
        {
            label: RequestTabs.ALL,
            key: RequestTabs.ALL,
            children: <AllRequestsTab/>,
        },
        {
            label: RequestTabs.PENDING,
            key: RequestTabs.PENDING,
            children: <PendingRequestsTab/>,
        },
        {
            label: RequestTabs.APPROVED,
            key: RequestTabs.APPROVED,
            children: <ApprovedRequestsTab/>,
        },
        {
            label: RequestTabs.REJECTED,
            key: RequestTabs.REJECTED,
            children: <RejectedRequestsTab/>,
        },
    ];
    return (
        <AdminLayout>
            <Tabs defaultActiveKey="1" centered items={items}/>
        </AdminLayout>
    );
};

export default Requests;
