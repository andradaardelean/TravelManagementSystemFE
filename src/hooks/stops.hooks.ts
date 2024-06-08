import {useQuery} from "react-query";
import {getStop, getStops} from "../api/apis";
import {Stop} from "../types/interfaces/Stop";

export const useStops = () => {
    return useQuery({
        queryKey: ['stops'],
        queryFn: async (): Promise<Stop[]> => {
            return await getStops();
        },
    })
}

export const useStop = (
    id: string,
) => {
    return useQuery({
        queryKey: ['stop', id],
        queryFn: async (): Promise<Stop> => {
            return await getStop(id);
        },
        enabled: Boolean(id),
    })
}