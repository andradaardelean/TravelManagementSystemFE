import {List} from "antd";
import {useGetAllRequests} from "../../../hooks/requests.hooks";


const ApprovedRequestsTab: React.FC = () => {
    const {data: requests, isLoading} = useGetAllRequests('APPROVED');

    return (
        <List
            className="demo-loadmore-list"
            loading={isLoading}
            itemLayout="horizontal"
            dataSource={requests}
            renderItem={(item) => (
                <List.Item
                >
                    <List.Item.Meta
                        title={`${item.id} - ${item.type}`}
                        description={`${item?.company?.name} | ${item?.company?.description} | ${item?.company?.ownerName} | ${item?.company?.ownerEmail} | ${item?.company?.phone}`}
                    />
                    <div>STATUS: {item.status ?? "UNKNOWN"}</div>
                </List.Item>
            )}
        />
    );
};

export default ApprovedRequestsTab;
