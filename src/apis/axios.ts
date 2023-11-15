import axios, { AxiosError } from "axios";
import { getCookie, deleteCookie } from "cookies-next";

/** 토큰 관리 및 중복 코드 방지를 위한 instance */
export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    timeout: 10000,
});

/** 자동 토큰 추가를 위한 request interceptors */
instance.interceptors.request.use(
    (config) => {
        const accessToken = getCookie("access_token");
        const returnConfig = { ...config };
        if (accessToken) {
            returnConfig.headers!["Authorization"] = `Bearer ${accessToken}`;
            returnConfig.headers!["X-Not-Using-Xquare-Auth"] = true;
        }
        return returnConfig;
    },
    (error: AxiosError) => Promise.reject(error)
);

/** 자동 토큰 관리를 위한 response interceptors */
instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<AxiosError>) => {
        if (axios.isAxiosError(error) && error.response) {
            if (
                error.response.data.message === "Invalid Token" ||
                error.response.data.message === "Token Expired" ||
                error.response.data.status === 401 ||
                !getCookie("access_token")
            ) {
                deleteCookie("access_token");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);
