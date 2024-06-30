import {useMutation, useQuery, UseQueryResult} from "react-query";
import {
    createBooking,
    deleteBooking,
    getAllBookings,
    getBookingsByCompany,
    getBookingsById,
    getBookingsByUsername
} from "../api/apis";
import {BookingArgs} from "../types/interfaces/HooksArgs/BookingArgs";
import {useState} from "react";
import {AddBookingArgs} from "../types/interfaces/HooksArgs/AddBookingArgs";
import {BookingLink} from "../types/interfaces/BookingLink";

export const useBooking = (
    id: string,
): UseQueryResult<BookingLink[], unknown> => {
    return useQuery({
        queryKey: ['booking-ling', id],
        queryFn: async (): Promise<BookingLink[]> => {
            return await getBookingsById({id});
        },
    })
}


export const useBookingsByUser = (
    args: BookingArgs,
): UseQueryResult<any[], unknown> => {
    return useQuery({
        queryKey: ['bookings-by-user'],
        queryFn: async () => {
            return await getBookingsByUsername(args);
        },
    })
}

export const useCreateBooking = () => {
    const [data, setData] = useState<string | null>(null);
    const mutation = useMutation<void, unknown, AddBookingArgs, unknown>(async (createBookingArgs: AddBookingArgs) => {
        const _data: string = await createBooking(createBookingArgs);
        if (_data) {
            setData(_data);
        }
    });

    const createBookingMutation = async (createBookingArgs: AddBookingArgs) => {
        await mutation.mutateAsync(createBookingArgs);
    };

    return {mutate: createBookingMutation, data: data};
};


export const useGetAllBookings = () => {
    return useQuery({
        queryKey: ['all-bookings'],
        queryFn: async () => {
            return await getAllBookings();
        },
    })
}

export const useBookingsByCompany = (
    company: string
): UseQueryResult<BookingLink[], unknown> => {
    return useQuery({
        queryKey: ['bookings-by-company'],
        queryFn: async () => {
            return await getBookingsByCompany(company);
        },
    })
}

export const useDeleteBooking = () => {
    const mutation = useMutation<void, unknown, string, unknown>(async (id: string) => {
        await deleteBooking(id);
    });

    const deleteBookingMutation = async (id: string) => {
        await mutation.mutateAsync(id);
    };

    return {mutate: deleteBookingMutation};
}