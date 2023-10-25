"use client";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie, setCookie } from "cookies-next";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { loginDataType } from "./type";
import { instance } from "@/apis/axios";

const path = "/user";

/** 로그인 */
export const Login = (loginData: loginDataType, checkBoxValue: boolean) => {
    const router = useRouter();
    return useMutation(async () => instance.post(`${path}/auth`, loginData), {
        onSuccess: (res) => {
            if (checkBoxValue) {
                setCookie("account_id", loginData.account_id);
            } else {
                deleteCookie("account_id");
            }
            const accessExpired = new Date(res.data.access_expires_at);
            setCookie("access_token", res.data.access_token, {
                expires: accessExpired,
            });
            router.push("/");
        },
        onError: (err: AxiosError<AxiosError>) => {
            if (err.response) {
                switch (err.response.status) {
                    case 404:
                        alert("아이디와 비밀번호를 다시 확인해주세요.");
                        break;
                    case 500:
                        alert("개발자에게 문의해주세요.");
                        break;
                }
            } else {
                alert("네트워크 연결을 확인해주세요.");
            }
        },
    });
};
