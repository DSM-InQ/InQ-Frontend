'use client';
import { useRouter } from 'next/navigation';
import { signupDataType } from './type';
import { useMutation } from '@tanstack/react-query';
import { instance } from '../axios';
import { AxiosError } from 'axios';

const BASE_URL = 'http://43.200.116.136:8080';

/**
 *회원가입
 * @param signupData 아이디, 이름, 비밀번호, 직업, 경력
 * @returns signup api 호출 성공/실패 여부
 */
export const Signup = (signupData: Omit<signupDataType, 'password2'>) => {
    const router = useRouter();

    return useMutation(async () => instance.post(`${BASE_URL}/user`, signupData), {
        onSuccess: () => {
            router.push('/login');
        },
        onError: (err: AxiosError<AxiosError>) => {
            if (err.response) {
                switch (err.response.status) {
                    case 404:
                        alert('정보를 다시 확인해 주세요.');
                        break;
                    case 409:
                        alert('이미 존재하는 계정입니다.');
                        break;
                }
            } else {
                alert('네트워크 연결을 확인해 주세요.');
            }
        },
    });
};
