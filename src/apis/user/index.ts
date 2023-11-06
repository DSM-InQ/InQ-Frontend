import { useQuery } from '@tanstack/react-query';
import { instance } from '../axios';
import { myAnswerResponse, myInfoResponse } from './type';

const path = '/user';
const BASE_URL = 'http://43.200.116.136:8080';

/**
 * 유저정보들을 받는 api입니다.
 * @param
 * @returns 유저정보 조회 api 호출 성공/실패 여부
 */
export const useGetMyInfo = () => {
    return useQuery(
        ['getMyInfo'],
        async () => {
            const { data } = await instance.get<myInfoResponse>(`${BASE_URL}${path}/profile`);
            return data;
        },
        {
            enabled: undefined,
        }
    );
};

/**
 * 답변 내역들을 받는 api입니다.
 * @param
 * @returns 답변 내역 조회 api 호출 성공/실패 여부
 */
export const useGetMyAnswer = () => {
    return useQuery(
        ['getMyAnswer'],
        async () => {
            const { data } = await instance.get<myAnswerResponse>(`${BASE_URL}${path}/me/questions`);
            return data;
        },
        {
            enabled: undefined,
        }
    );
};
