import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { instance } from '@/apis/axios';
import { myInfoChangeDataTyp } from './type';

const BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

/**
 *유저정보 수정
 * @param myInfoChangeData 이름, 직업, 경력
 * @returns myInfoChange api 호출 성공/실패 여부
 */
export const MyInfoChange = (myInfoChangeData: myInfoChangeDataTyp) => {
    const router = useRouter();

    return useMutation(async () => instance.put(`${BASE_URL}/user/profile`, myInfoChangeData), {
        onSuccess: () => {
            router.push('/myInfo');
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
            } else {
                alert('네트워크 연결을 확인해 주세요.');
            }
        },
    });
};
