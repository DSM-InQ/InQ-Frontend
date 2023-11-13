import { MutationOptions, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { instance } from '../axios';
import { questionListType, questionResponse, questionSetDetailResponse, questionSetResponse } from './type';

const BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
const path = '/question';

/**
 * 카테고리의 태그들을 받는 api입니다.
 * @param category 카테고리 영어로
 * @returns 태그 조회 api 호출 성공/실패 여부
 */
export const useGetTag = (category: string) => {
    return useQuery(
        ['getTag', category],
        async () => {
            const queryString = category ? `?category=${category}` : '';
            const { data } = await instance.get<{ tag_list: string[] }>(`${BASE_URL}${path}/tag${queryString}`);
            return data;
        },
        {
            enabled: category !== '랭킹',
        }
    );
};

/**
 * 질문 랭킹 api입니다.
 * @returns 질문 랭킹 목록 조회 api 호출 성공/실패 여부
 */
export const useGetQuestionRank = () => {
    return useInfiniteQuery(
        ['getQuestionRank'],
        async ({ pageParam = 0 }) => {
            const { data } = await instance.get<questionResponse>(`${BASE_URL}${path}/rank?page=${pageParam}`);
            return data;
        },
        {
            getNextPageParam: (_, a) => a.length,
        }
    );
};

/**
 * 질문세트 랭킹 api입니다.
 * @returns 질문세트 랭킹 목록 조회 api 호출 성공/실패 여부
 */
export const useGetQuestionSetRank = () => {
    return useInfiniteQuery(
        ['getQuestionRank'],
        async ({ pageParam = 0 }) => {
            const { data } = await instance.get<questionSetResponse>(`${BASE_URL}${path}/set/rank?page=${pageParam}`);
            return data;
        },
        {
            enabled: false,
            getNextPageParam: (_, a) => a.length,
        }
    );
};

/**
 * 질문 목록 조회 api입니다.
 * @param category 카테고리 영어로
 * @param tags 선택한 태그들
 * @param keyword 검색할 키워드
 * @returns 질문 목록 조회 api 호출 성공/실패 여부
 */
export const useGetQuestionList = (category: string, tags?: string[], keyword?: string) => {
    return useInfiniteQuery(
        ['getQuestionList', category, tags, keyword],
        async ({ pageParam = 0 }) => {
            const tagsQueryString = tags?.length ? `&tags=${tags}` : '';
            const keywordQueryString = keyword ? `&keyword=${keyword}` : '';
            const { data } = await instance.get<questionResponse>(
                `${BASE_URL}${path}?category=${category}&page=${pageParam}${tagsQueryString}${keywordQueryString}`
            );
            return data;
        },
        {
            enabled: false,
            getNextPageParam: (_, a) => a.length,
        }
    );
};

/**
 * 질문세트 목록 조회 api입니다.
 * @param category 카테고리 영어로
 * @param tags 선택한 태그들
 * @param keyword 검색할 키워드
 * @returns 질문세트 목록 조회 api 호출 성공/실패 여부
 */
export const useGetQuestionSetList = (category: string, tags?: string[], keyword?: string) => {
    return useInfiniteQuery(
        ['getQuestionSetList', category, tags, keyword],
        async ({ pageParam = 0 }) => {
            const tagsQueryString = tags?.length ? `?&tags=${tags}` : '';
            const keywordQueryString = keyword ? `&keyword=${keyword}` : '';
            const { data } = await instance.get<questionSetResponse>(
                `${BASE_URL}${path}/set?category=${category}&page=${pageParam}${tagsQueryString}${keywordQueryString}`
            );
            return data;
        },
        {
            enabled: false,
            getNextPageParam: (_, a) => a.length,
        }
    );
};

/**
 * 질문세트 상세보기 조회 api입니다.
 * @param id 조회할 질문세트 id
 * @returns 질문세트 상세보기 조회 api 호출 성공/실패 여부
 */
export const useGetQuestionSetDetail = (id: string) => {
    return useQuery(['getQuestionSetDetail', id], async () => {
        const { data } = await instance.get<questionSetDetailResponse>(`${BASE_URL}${path}/set/${id}`);
        return data;
    });
};

/**
 * 오늘의 질문 조회 api입니다.
 * @returns 오늘의 질문 조회 api 호출 성공/실패 여부
 */
export const useGetQuestionOfTheDay = () => {
    return useQuery(['getQuestionOfTheDay'], async () => {
        const { data } = await instance.get<questionListType>(`${BASE_URL}${path}/today`);
        return data;
    });
};

/**
 * 인기 질문 조회 api입니다.
 * @returns 인기 질문 조회 api 호출 성공/실패 여부
 */
export const useGetPopularQuestion = () => {
    return useQuery(['getPopularQuestion'], async () => {
        const { data } = await instance.get<questionResponse>(`${BASE_URL}${path}/popular`);
        return data;
    });
};

/**
 * 인기 질문세트 조회 api입니다.
 * @returns 인기 질문세트 조회 api 호출 성공/실패 여부
 */
export const useGetPopularQuestionSet = () => {
    return useQuery(['getPopularQuestionSet'], async () => {
        const { data } = await instance.get<questionSetResponse>(`${BASE_URL}${path}/set/popular`);
        return data;
    });
};

/**
 * 질문세트 즐겨찾기 요청 api입니다.
 * @param questionSetId 어떤 질문세트인지 id로 넣으면 됨
 * @param options onSuccess, onError등등 넣으면 됨
 * @returns 성공시 "is_favorite" : true
 */
export const useQuestionSetFavorite = (questionSetId: number, options: MutationOptions) => {
    return useMutation(async () => instance.post(`${BASE_URL}${path}/set/${questionSetId}/favorite`), {
        ...options,
    });
};

/**
 * 질문 즐겨찾기 요청 api입니다.
 * @param questionId 어떤 질문인지 id로 넣으면 됨
 * @param options onSuccess, onError등등 넣으면 됨
 * @returns 성공시 "is_favorite" : true
 */
export const useQuestionFavorite = (questionId: number, options: MutationOptions) => {
    return useMutation(async () => instance.post(`${BASE_URL}${path}/${questionId}/favorite`), {
        ...options,
    });
};

/**
 * 질문세트 싫어요 api입니다.
 * @param questionId 어떤 질문인지 id로 넣으면 됨
 * @param options onSuccess, onError등등 넣으면 됨
 * @returns 성공시 "is_disliked" : true
 */
export const useQuestionSetDislike = (questionSetId: string, options: MutationOptions) => {
    return useMutation(async () => instance.post(`${BASE_URL}${path}/set/${questionSetId}/dislike`), {
        ...options,
    });
};

/**
 * 질문세트 좋아요 api입니다.
 * @param questionSetId 어떤 질문세트인지 id로 넣으면 됨
 * @param options onSuccess, onError등등 넣으면 됨
 * @returns "is_liked" : true
 */
export const useQuestionSetLike = (questionSetId: string, options: MutationOptions) => {
    return useMutation(async () => instance.post(`${BASE_URL}${path}/set/${questionSetId}/like`), {
        ...options,
    });
};
