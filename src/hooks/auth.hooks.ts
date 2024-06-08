import {useMutation} from "react-query"
import {changeUserPassword, login, logout, requestPasswordReset, signup} from "../api/apis";
import {redirect} from "react-router-dom";
import {LoginArgs} from "../types/interfaces/HooksArgs/LoginArgs";
import {RequestResetPassword} from "../types/interfaces/HooksArgs/RequestResetPassword";
import {ChangePassword} from "../types/interfaces/HooksArgs/ChangePassword";
import {SignUpArgs} from "../types/interfaces/HooksArgs/SignUpArgs";

export const useLogin = () => {
    return useMutation<void, unknown, LoginArgs, unknown>(async () => {
        await login();
    })
}

export const useSignup = () => {
    const mutation = useMutation<void, unknown, SignUpArgs, unknown>(async (signUpArgs: SignUpArgs) => {
        await signup(signUpArgs);
    });

    const signUpMutation = async (signUpArgs: SignUpArgs) => {
        await mutation.mutateAsync(signUpArgs);
    };

    return {mutate: signUpMutation};

}

export const useLogout = () => {
    return useMutation(async () => {
        await logout();
        localStorage.removeItem("token");
        redirect("/login");
    })
}

export const useRequestPasswordReset = () => {
    const mutation = useMutation<void, unknown, RequestResetPassword, unknown>(async (requestResetPassword: RequestResetPassword) => {
        await requestPasswordReset(requestResetPassword);
    });

    const requestResetPasswordMutation = async (requestResetPassword: RequestResetPassword) => {
        await mutation.mutateAsync(requestResetPassword);
    };

    return {mutate: requestResetPasswordMutation};
};

export const useChangePassword = () => {
    const mutation = useMutation<void, unknown, ChangePassword, unknown>(async (changePassword: ChangePassword) => {
        await changeUserPassword(changePassword);
    });

    const requestResetPasswordMutation = async (changePassword: ChangePassword) => {
        await mutation.mutateAsync(changePassword);
    };

    return {mutate: requestResetPasswordMutation};
}