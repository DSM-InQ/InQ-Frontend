import { useQuery } from "@tanstack/react-query";
import { instance } from "../axios";
import { questionResponse } from "./type";

const path = "/question";

/** 카테고리의 태그들을 받는 api입니다. */
export const useGetTag = (category: string) => {
    return useQuery(
        ["getTag", category],
        async () => {
            console.log(category);
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

/** 질문 랭킹 api입니다. */
export const useGetQuestionRank = (page: number) => {
    return useQuery(["getQuestionRank", page], async () => {
        const queryString = page ? `?page=${page}` : "";
        const { data } = await instance.get<questionResponse>(
            `${path}/rank${queryString}`
        );
        return data;
    });
};
