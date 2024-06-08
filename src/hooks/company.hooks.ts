import {useMutation, useQuery} from "react-query";
import {addCompany, deleteCompany, editCompany, getAllCompanies, getCompany, getCompanyStatistics} from "../api/apis";
import {Company} from "../types/interfaces/Company";
import {AddCompanyArgs} from "../types/interfaces/HooksArgs/AddCompanyArgs";

export const useCompanies = () => {
    return useQuery({
        queryKey: ['companies'],
        queryFn: async () => {
            return await getAllCompanies();
        },
    })
}

export const useAddCompany = () => {
    const mutation = useMutation<void, unknown, AddCompanyArgs, unknown>(async (company: AddCompanyArgs) => {
        await addCompany(company);
    });

    const addCompanyMutation = async (company: AddCompanyArgs) => {
        await mutation.mutateAsync(company);
    };

    return {mutate: addCompanyMutation};
}

export const useEditCompany = () => {
    const mutation = useMutation<void, unknown, Company, unknown>(async (company: Company) => {
        await editCompany(company);
    });

    const editCompanyMutation = async (company: Company) => {
        await mutation.mutateAsync(company);
    };

    return {mutate: editCompanyMutation};
}

export const useDeleteCompany = () => {
    const mutation = useMutation<void, unknown, string, unknown>(async (companyId: string) => {
        await deleteCompany(companyId);
    });

    const deleteCompanyMutation = async (companyId: string) => {
        await mutation.mutateAsync(companyId);
    };

    return {mutate: deleteCompanyMutation};
}

export const useCompany = (name: string) => {
    return useQuery({
        queryKey: ['company', name],
        queryFn: async () => {
            return await getCompany(name);
        },
    })
}

export const useCompanyStatistics = (company: string) => {
    return useQuery({
        queryKey: ['company-statistics'],
        queryFn: async () => {
            return await getCompanyStatistics(company);
        },
    })
}