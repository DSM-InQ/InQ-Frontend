import { MutationOptions, useMutation } from '@tanstack/react-query';
import { instance } from '../axios';

const path = '/comment';

/**
 * 질문 세트 댓글 작성
 * @param setId 어떤 질문세트인지 id로 넣으면 됨
 * @param comment 댓글 내용
 * @param options onSuccess, onError 등등 넣으면 됨
 * @returns useSetWriteComment API 호출 성공/실패 여부
 */
export const useSetWriteComment = (setId: string, comment: string, options: MutationOptions) => {
    return useMutation(
        async () =>
            instance.post(`${path}/question-set/${setId}`, {
                comment: comment,
            }),
        {
            ...options,
        }
    );
};
