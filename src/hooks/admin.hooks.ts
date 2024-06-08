import {useQuery} from "react-query";
import {getAdminStatistics} from "../api/apis";

export const useAdminStatistics = () => {
    return useQuery({
        queryKey: ['admin-statistics'],
        queryFn: async () => {
            return await getAdminStatistics();
        },
    })
}