'use client';
import { useRouter } from 'next/navigation';
import { registerQuestionDataType } from './type';
import { useMutation } from '@tanstack/react-query';
import { instance } from '../axios';
import { AxiosError } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

/**
 *질문 등록
 * @param registerQuestionData 카테고리, 질문, 답변, 태그
 * @returns registerQuestion api 호출 성공/실패 여부
 */
export const RegisterQuestion = (registerQuestionData: Omit<registerQuestionDataType, 'tag'>) => {
    const router = useRouter();

    return useMutation(async () => instance.post(`${BASE_URL}/question`, registerQuestionData), {
        onSuccess: () => {
            router.push('/');
        },
        onError: (err: AxiosError<AxiosError>) => {
            if (err.response) {
                switch (err.response.status) {
                    case 400:
                        alert('정보를 다시 확인해 주세요.');
                        break;
                    case 409:
                        alert('개발자에게 문의해 주세요.');
                        break;
                }
            } else {
                alert('네트워크 연결을 확인해 주세요.');
            }
        },
    });
};
