import { MutationOptions, useMutation } from "@tanstack/react-query";
import { instance } from "../axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_KEY;
const path = "/comment";

/**
 * 질문세트 댓글 작성 api입니다.
 * @param questionSetId 어떤 질문세트인지 id로 넣으면 됨
 * @param comment 댓글 내용
 * @param options onSuccess, onError등등 넣으면 됨
 * @returns 성공시 "is_favorite" : true
 */
export const useQuestionSetWriteComment = (
    questionSetId: string,
    comment: string,
    options: MutationOptions
) => {
    return useMutation(
        async () =>
            instance.post(`${BASE_URL}${path}/question-set/${questionSetId}`, {
                comment: comment,
            }),
        {
            ...options,
        }
    );
};
