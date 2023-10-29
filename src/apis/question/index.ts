import { useQuery } from "@tanstack/react-query";
import { instance } from "../axios";
import { questionResponse, questionSetResponse } from "./type";

const path = "/question";

/**
 * 카테고리의 태그들을 받는 api입니다.
 * @param category 카테고리 한글로
 * @returns 태그 조회 api 호출 성공/실패 여부
 */
export const useGetTag = (category: string) => {
    return useQuery(
        ["getTag", category],
        async () => {
            const queryString = category ? `?category=${category}` : "";
            const { data } = await instance.get<{ tag_list: string[] }>(
                `${path}/tag${queryString}`
            );
            return data;
        },
        {
            enabled: category !== undefined,
        }
    );
};

/**
 * 질문 랭킹 api입니다.
 * @param page 몇 번째 page 호출할건지
 * @param category 카테고리 한글로
 * @returns 질문 랭킹 목록 조회 api 호출 성공/실패 여부
 */
export const useGetQuestionRank = (page: number, category: string) => {
    return useQuery(
        ["getQuestionRank", page, category],
        async () => {
            const queryString = page ? `?page=${page}` : "";
            const { data } = await instance.get<questionResponse>(
                `${path}/rank${queryString}`
            );
            return data;
        },
        {
            enabled: false,
        }
    );
};

/**
 * 질문 목록 조회 api입니다.
 * @param page 몇 번째 page 호출할건지
 * @param category 카테고리 한글로
 * @param tags 선택한 태그들
 * @param keyword 검색할 키워드
 * @returns 질문 목록 조회 api 호출 성공/실패 여부
 */
export const useGetQuestionList = (
    page: number,
    category: string,
    tags?: string[],
    keyword?: string
) => {
    return useQuery(
        ["getQuestionList", page, category, tags, keyword],
        async () => {
            const tagsQueryString = tags?.length ? `?&tags=${tags}` : "";
            const keywordQueryString = keyword ? `&keyword=${keyword}` : "";
            const { data } = await instance.get<questionResponse>(
                `${path}?category=${category}&page=${page}${tagsQueryString}${keywordQueryString}`
            );
            return data;
        },
        {
            enabled: false,
        }
    );
};

/**
 * 질문세트 목록 조회 api입니다.
 * @param page 몇 번째 page 호출할건지
 * @param category 카테고리 한글로
 * @param tags 선택한 태그들
 * @param keyword 검색할 키워드
 * @returns 질문 목록 조회 api 호출 성공/실패 여부
 */
export const useGetQuestionSetList = (
    page: number,
    category: string,
    tags?: string[],
    keyword?: string
) => {
    return useQuery(
        ["getQuestionList", page, category, tags, keyword],
        async () => {
            const tagsQueryString = tags?.length ? `?&tags=${tags}` : "";
            const keywordQueryString = keyword ? `&keyword=${keyword}` : "";
            const { data } = await instance.get<questionSetResponse>(
                `${path}/set?category=${category}&page=${page}${tagsQueryString}${keywordQueryString}`
            );
            return data;
        },
        {
            enabled: false,
        }
    );
};
