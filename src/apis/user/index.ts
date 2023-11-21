import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from '../axios';
import { checkResponse, myInfoResponse, myQuestionType, signupDataType, myAnswerResponse } from './type';
import { useMutation } from '@tanstack/react-query';
import { deleteCookie, setCookie } from 'cookies-next';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { loginDataType } from './type';
import { setListResponse } from '../question/type';

const path = '/user';

/**
 * 회원가입
 * @param signupData 아이디, 이름, 비밀번호, 직업, 경력
 * @returns useSignup API 호출 성공/실패 여부
 */
export const useSignup = (signupData: Omit<signupDataType, 'password2'>) => {
    const router = useRouter();

    return useMutation(async () => instance.post(`${path}`, signupData), {
        onSuccess: () => {
            router.push('/login');
            alert('회원가입을 성공했습니다.');
        },
        onError: (err: AxiosError<AxiosError>) => {
            if (err.response) {
                switch (err.response.status) {
                    case 400:
                        alert('정보를 다시 확인해 주세요.');
                        break;
                    case 401:
                        alert('개발자에게 문의해 주세요.');
                        break;
                    case 409:
                        alert('이미 존재하는 계정입니다.');
                        break;
                }
            } else alert('네트워크 연결 상태를 확인해 주세요.');
        },
    });
};

/**
 * 로그인
 * @param loginData 아이디, 비밀번호
 * @param checkBoxValue 아이디 저장 여부
 * @returns useLogin API 호출 성공/실패 여부
 */
export const useLogin = (loginData: loginDataType, checkBoxValue: boolean) => {
    const router = useRouter();

    return useMutation(async () => instance.post(`${path}/auth`, loginData), {
        onSuccess: (res) => {
            if (checkBoxValue) setCookie('account_id', loginData.account_id);
            else deleteCookie('account_id');

            const accessExpired = new Date(res.data.access_expires_at);
            setCookie('access_token', res.data.access_token, {
                expires: accessExpired,
            });

            router.push('/');
            alert('로그인을 성공했습니다.');
        },
        onError: (err: AxiosError<AxiosError>) => {
            if (err.response) {
                switch (err.response.status) {
                    case 400:
                        alert('아이디와 비밀번호를 다시 확인해 주세요.');
                        break;
                    case 500:
                        alert('개발자에게 문의해 주세요.');
                        break;
                }
            } else alert('네트워크 연결 상태를 확인해 주세요.');
        },
    });
};

/**
 * 유저정보 조회 API
 * @param
 * @returns 유저정보 조회 data
 */
export const useGetMyInfo = () => {
    return useQuery(
        ['getMyInfo'],
        async () => {
            const { data } = await instance.get<myInfoResponse>(`${path}/profile`);
            return data;
        },
        {
            enabled: undefined,
        }
    );
};

/**
 * 유저정보 수정
 * @param myInfoChangeData 이름, 직업, 경력
 * @returns useMyInfoChange API 호출 성공/실패 여부
 */
export const useMyInfoChange = (myInfoChangeData: Omit<signupDataType, 'account_id' | 'password' | 'password2'>) => {
    const router = useRouter();

    return useMutation(async () => instance.put(`${path}/profile`, myInfoChangeData), {
        onSuccess: () => {
            router.push('/myInfo');
            alert('정보 수정을 성공했습니다.');
        },
        onError: (err: AxiosError<AxiosError>) => {
            if (err.response) {
                switch (err.response.status) {
                    case 400:
                        alert('정보를 다시 확인해 주세요.');
                        break;
                    case 401:
                        alert('개발자에게 문의해 주세요.');
                        break;
                }
            } else alert('네트워크 연결 상태를 확인해 주세요.');
        },
    });
};

/**
 * 출석체크 조회 API
 * @param
 * @returns 출석체크 조회 data
 */
export const useGetCheck = () => {
    return useQuery(
        ['getCheck'],
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
 * 출석체크
 * @param
 * @returns useCheck API 호출 성공/실패 여부
 */
export const useCheck = () => {
    const queryClient = useQueryClient();

    return useMutation(async () => instance.post(`${path}/check`), {
        onSuccess: () => {
            queryClient.invalidateQueries(['getMyInfo']);
            queryClient.invalidateQueries(['getCheck']);
            alert('출석체크를 성공했습니다.');
        },
        onError: (err: AxiosError<AxiosError>) => {
            if (err.response) {
                switch (err.response.status) {
                    case 400:
                        alert('정보를 다시 확인해 주세요.');
                        break;
                    case 401:
                        alert('개발자에게 문의해 주세요.');
                        break;
                    case 409:
                        alert('출석체크를 이미 했습니다.');
                        break;
                    case 429:
                        alert('1분 뒤 다시 시도해 주세요.');
                }
            } else alert('네트워크 연결 상태를 확인해 주세요.');
        },
    });
};

/**
 * 답변 내역 조회 API
 * @param
 * @returns 답변 내역 조회 data
 */
export const useGetMyAnswer = () => {
    return useInfiniteQuery(
        ['getMyAnswer'],
        async ({ pageParam = 0 }) => {
            const { data } = await instance.get<myAnswerResponse>(`${path}/me/questions?page=${pageParam}`);
            return data;
        },
        {
            getNextPageParam: (_, a) => a.length,
        }
    );
};

/**
 * 내가 등록한 질문 조회 API
 * @param
 * @returns 내가 등록한 질문 조회 data
 */
export const useGetMyQuestion = () => {
    return useInfiniteQuery(
        ['getMyQuestion'],
        async ({ pageParam = 0 }) => {
            const { data } = await instance.get<myQuestionType[]>(`${path}/question?page=${pageParam}`);
            return data;
        },
        {
            getNextPageParam: (_, a) => a.length,
        }
    );
};

/**
 * 내가 등록한 질문 세트 조회 API
 * @param
 * @returns 내가 등록한 질문 세트 조회 data
 */
export const useGetMySet = () => {
    return useInfiniteQuery(
        ['getMySet'],
        async ({ pageParam = 0 }) => {
            const { data } = await instance.get<setListResponse>(`${path}/set?page=${pageParam}`);
            return data;
        },
        {
            getNextPageParam: (_, a) => a.length,
        }
    );
};
