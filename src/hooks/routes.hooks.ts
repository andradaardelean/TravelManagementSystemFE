import {useMutation, useQuery, UseQueryResult} from "react-query";
import {addRoute, deleteRoute, editRoute, getAllRoutes, getRoute, getRoutes, getRoutesByCompany} from "../api/apis";
import {Route} from "../types/interfaces/Route";
import {SearchRouteArgs} from "../types/interfaces/HooksArgs/SearchRouteArgs";
import {AddRouteArgs} from "../types/interfaces/HooksArgs/AddRouteArgs";
import {SearchResult} from "../types/interfaces/SeachResults";
import {DeleteRouteArgs} from "../types/interfaces/HooksArgs/DeleteRouteArgs";

export const useAddRoute = () => {
    const mutation = useMutation<void, unknown, AddRouteArgs, unknown>(async (route: AddRouteArgs) => {
        await addRoute(route);
    });

    const createRouteMutation = async (route: AddRouteArgs) => {
        await mutation.mutateAsync(route);
    };

    return {mutate: createRouteMutation};
}

export const useRoutes = (
    args: SearchRouteArgs, ...options: any
): UseQueryResult<SearchResult[], unknown> => {
    return useQuery({
        queryKey: ['routes'],
        queryFn: async (): Promise<SearchResult[]> => {
            return await getRoutes(args);
        },
        retry: false,
        ...options
    })
}

export const useRoute = (
    id: string,
) => {
    return useQuery({
        queryKey: ['route', id],
        queryFn: async () => {
            return await getRoute(id);
        },
        enabled: Boolean(id),
    })
}
export const useRoutesByCompany = (
    company: string
): UseQueryResult<Route[], unknown> => {
    return useQuery({
        queryKey: ['routes-by-company'],
        queryFn: async () => {
            return await getRoutesByCompany(company);
        },
    })
}

export const useEditRoute = () => {
    const mutation = useMutation<void, unknown, Route, unknown>(async (route: Route) => {
        await editRoute(route);
    });

    const editRouteMutation = async (route: Route) => {
        await mutation.mutateAsync(route);
    };

    return {mutate: editRouteMutation};
}

export const useDeleteRoute = () => {
    const mutation = useMutation<void, unknown, DeleteRouteArgs, unknown>(async (args: DeleteRouteArgs) => {
        await deleteRoute(args);
    });

    const deleteRouteMutation = async (args: DeleteRouteArgs) => {
        await mutation.mutateAsync(args);
    };

    return {mutate: deleteRouteMutation};
}

export const useAllRoutes = () => {
    return useQuery({
        queryKey: ['all-routes'],
        queryFn: async () => {
            return await getAllRoutes();
        },
    })
}