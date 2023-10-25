import axios, { AxiosError } from "axios";
import { getCookie, deleteCookie } from "cookies-next";

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 10000,
});

instance.interceptors.request.use(
    (config) => {
        const accessToken = getCookie("access_token");
        const returnConfig = { ...config };
        if (accessToken) {
            returnConfig.headers!["Authorization"] = `Bearer ${accessToken}`;
        }
        return returnConfig;
    },
    (error: AxiosError) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<AxiosError>) => {
        if (axios.isAxiosError(error) && error.response) {
            if (
                error.response.data.message === "Invalid Token" ||
                error.response.data.message === "Token Expired" ||
                error.response.data.message === "Unexpected token" ||
                !getCookie("access_token")
            ) {
                deleteCookie("access_token");
                deleteCookie("refresh_token");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);
