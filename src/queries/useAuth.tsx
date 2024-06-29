import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store";
import { useNotification } from "../hooks/useNotification";
import { LoginRequest } from "../interfaces/auth/auth.interface";
import { login } from "../api/auth";

export const useLogin = () => {
    const { login: Login } = useAuthStore();
    const { getSuccess, getError } = useNotification();

    const mutation = useMutation({
        onSuccess: (data) => {
            getSuccess('Successful login');
            Login(data); 
        },
        onError: (error) => {
            console.log(error);
            getError('Username or password incorrect');
        },
        mutationFn: (Login: LoginRequest) => login(Login),
    });
    return mutation;
};
