import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { instance } from "../axios";
import {
    checkResponse,
    myInfoChangeDataTyp,
    myInfoResponse,
    myQuestionType,
    signupDataType,
    solvedQuestionResponse,
} from "./type";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie, setCookie } from "cookies-next";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { loginDataType } from "./type";
import { questionSetResponse } from "../question/type";

const path = "/user";

/**
 * 유저정보들을 받는 api입니다.
 * @param
 * @returns 유저정보 조회 api 호출 성공/실패 여부
 */
export const useGetMyInfo = () => {
    return useQuery(
        ["getMyInfo"],
        async () => {
            const { data } = await instance.get<myInfoResponse>(
                `${path}/profile`
            );
            return data;
        },
        {
            enabled: undefined,
        }
    );
};

/**
 * 출석체크 정보를 받는 api입니다.
 * @param
 * @returns 출석체크 조회 api 호출 성공/실패 여부
 */
export const useGetCheck = () => {
    return useQuery(
        ["getCheck"],
        async () => {
            const { data } = await instance.get<checkResponse>(`${path}/check`);
            return data;
        },
        {
            enabled: undefined,
        }
    );
};

/**
 *로그인
 * @param loginData 아이디 및 비밀번호
 * @param checkBoxValue 아이디 저장 여부
 * @returns login api 호출 성공/실패 여부
 */
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

/**
 *회원가입
 * @param signupData 아이디, 이름, 비밀번호, 직업, 경력
 * @returns signup api 호출 성공/실패 여부
 */
export const Signup = (signupData: Omit<signupDataType, "password2">) => {
    const router = useRouter();

    return useMutation(async () => instance.post(`${path}`, signupData), {
        onSuccess: () => {
            router.push("/login");
        },
        onError: (err: AxiosError<AxiosError>) => {
            if (err.response) {
                switch (err.response.status) {
                    case 404:
                        alert("정보를 다시 확인해 주세요.");
                        break;
                    case 409:
                        alert("이미 존재하는 계정입니다.");
                        break;
                }
            } else {
                alert("네트워크 연결을 확인해 주세요.");
            }
        },
    });
};

/**
 *유저정보 수정
 * @param myInfoChangeData 이름, 직업, 경력
 * @returns myInfoChange api 호출 성공/실패 여부
 */
export const MyInfoChange = (myInfoChangeData: myInfoChangeDataTyp) => {
    const router = useRouter();

    return useMutation(
        async () => instance.put(`${path}/profile`, myInfoChangeData),
        {
            onSuccess: () => {
                router.push("/myInfo");
            },
            onError: (err: AxiosError<AxiosError>) => {
                if (err.response) {
                    switch (err.response.status) {
                        case 400:
                            alert("정보를 다시 확인해 주세요.");
                            break;
                        case 401:
                            alert("개발자에게 문의해 주세요.");
                            break;
                    }
                } else {
                    alert("네트워크 연결을 확인해 주세요.");
                }
            },
        }
    );
};

/**
 * 출석체크
 * @param 없음
 * @returns checkDate api 호출 성공/실패 여부
 */
export const CheckDate = () => {
    return useMutation(async () => instance.post(`${path}/check`), {
        onSuccess: () => {
            alert("출석체크가 완료되었습니다!");
            history.go(0);
        },
        onError: (err: AxiosError<AxiosError>) => {
            if (err.response) {
                switch (err.response.status) {
                    case 404:
                        alert("정보를 다시 확인해 주세요.");
                        break;
                    case 409:
                        alert("이미 존재하는 계정입니다.");
                        break;
                }
            } else {
                alert("네트워크 연결을 확인해 주세요.");
            }
        },
    });
};

/**
 * 등록한 질문 조회 api입니다.
 * @returns 등록한 질문 조회 api 호출 성공/실패 여부
 */
export const useGetMyQuestion = () => {
    return useInfiniteQuery(
        ["getMyQuestion"],
        async ({ pageParam = 0 }) => {
            const { data } = await instance.get<myQuestionType[]>(
                `${path}/question?page=${pageParam}`
            );
            return data;
        },
        {
            getNextPageParam: (_, a) => a.length,
        }
    );
};

/**
 * 등록한 질문 세트 조회 api입니다.
 * @returns 등록한 질문 세트 조회 api 호출 성공/실패 여부
 */
export const useGetMyQuestionSet = () => {
    return useInfiniteQuery(
        ["getMyQuestionSet"],
        async ({ pageParam = 0 }) => {
            const { data } = await instance.get<questionSetResponse>(
                `${path}/set?page=${pageParam}`
            );
            return data;
        },
        {
            getNextPageParam: (_, a) => a.length,
        }
    );
};

/**
 * 답변한 질문/ 질문 세트 조회 api입니다.
 * @returns 답변한 질문/ 질문 세트 조회 api 호출 성공/실패 여부
 */
export const useGetMyAnswerQuestion = () => {
    return useInfiniteQuery(
        ["getMyAnswerQuestion"],
        async ({ pageParam = 0 }) => {
            const { data } = await instance.get<solvedQuestionResponse>(
                `${path}/me/questions?page=${pageParam}`
            );
            return data;
        },
        {
            getNextPageParam: (_, a) => a.length,
        }
    );
};
