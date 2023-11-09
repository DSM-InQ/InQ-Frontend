import { useQuery } from '@tanstack/react-query';
import { instance } from '../axios';
import { checkResponse, myInfoResponse } from './type';

const path = '/user';

/**
 * 유저정보들을 받는 api입니다.
 * @param
 * @returns 유저정보 조회 api 호출 성공/실패 여부
 */
export const useGetMyInfo = () => {
    return useQuery(
        ['getMyInfo'],
        async () => {
            const { data } = await instance.get<myInfoResponse>(`http://43.200.116.136:8080${path}/profile`);
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
