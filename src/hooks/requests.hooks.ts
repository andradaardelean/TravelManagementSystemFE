import {useMutation, useQuery} from "react-query";
import {AddRequestArgs} from "../types/interfaces/HooksArgs/AddRequestArgs";
import {createRequest, searchRequests, solveRequest} from "../api/apis";
import {SolveRequestArgs} from "../types/interfaces/HooksArgs/SolveRequestArgs";

export const useCreateRequest = () => {
    const mutation = useMutation<void, unknown, AddRequestArgs, unknown>(async (createRequestArgs: AddRequestArgs) => {
        await createRequest(createRequestArgs);

    });

    const createRequestMutation = async (createRequestArgs: AddRequestArgs) => {
        await mutation.mutateAsync(createRequestArgs);
    };

    return {mutate: createRequestMutation};
}

export const useGetAllRequests = (status: string) => {
    return useQuery({
        queryKey: ['all-requests', status],
        queryFn: async () => {
            return await searchRequests(status);
        },
    })
}

export const useSolverRequest = () => {
    const mutation = useMutation<void, unknown, SolveRequestArgs, unknown>(async (solveRequestArgs: SolveRequestArgs) => {
        await solveRequest(solveRequestArgs);

    });

    const solveRequestMutation = async (solveRequestArgs: SolveRequestArgs) => {
        await mutation.mutateAsync(solveRequestArgs);
    };

    return {mutate: solveRequestMutation};
}