'use client';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { instance } from '@/apis/axios';
import { useRouter } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

/**
 * 출석체크
 * @param 없음
 * @returns checkDate api 호출 성공/실패 여부
 */
export const CheckDate = () => {
    const router = useRouter();

    return useMutation(async () => instance.post(`${BASE_URL}/user/check`), {
        onSuccess: () => {
            history.go(0);
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
