import {useMutation, useQuery} from "react-query";
import {
    addUser,
    deleteUser,
    editUser,
    getAllUsers,
    getUserByToken,
    getUserByUsername,
    getUsersByCompany
} from "../api/apis";
import {User} from "../types/interfaces/User";

export const useUser = (username: string) => {
    return useQuery({
        queryKey: ['user', username],
        queryFn: async () => {
            if (!!localStorage.getItem('auth0token'))
                return await getUserByUsername(username);
        },
        enabled: !!username && !!localStorage.getItem('auth0token')
    })
}

export const useUserByToken = (token: string) => {
    return useQuery({
        queryKey: ['user-by-token', token],
        queryFn: async () => {
            return await getUserByToken(token);
        },
        enabled: !!token
    })

}

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            return await getAllUsers();
        },
    })
}

export const useUsersByCompany = (company: string) => {
    return useQuery({
        queryKey: ['users-by-company'],
        queryFn: async () => {
            return await getUsersByCompany(company);
        },
    })
}

export const useEditUser = () => {
    const mutation = useMutation<void, unknown, Partial<User>, unknown>(async (user: Partial<User>) => {
        await editUser(user);
    });

    const editUserMutation = async (user: Partial<User>) => {
        await mutation.mutateAsync(user);
    };

    return {mutate: editUserMutation};
}

export const useCreateUser = () => {
    const mutation = useMutation<void, unknown, User, unknown>(async (user: User) => {
        await addUser(user);
    });

    const createUserMutation = async (user: User) => {
        await mutation.mutateAsync(user);
    };

    return {mutate: createUserMutation};
}


export const useDeleteUser = () => {
    const mutation = useMutation<void, unknown, string, unknown>(async (username: string) => {
        await deleteUser(username);
    });

    const deleteUserMutation = async (username: string) => {
        await mutation.mutateAsync(username);
    };

    return {mutate: deleteUserMutation};
}