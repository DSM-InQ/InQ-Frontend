import { MutationOptions, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { instance } from '../axios';
import {
    questionDetailResponse,
    questionListType,
    questionListResponse,
    setDetailResponse,
    setListResponse,
    registerQuestionDataType,
    registerSetDataType,
    solvingQuestionInSetDataType,
    randomQuestionResponse,
    theOtherAnswerResponse,
} from './type';

const path = '/question';

/**
 * 질문 등록
 * @param registerQuestionData 카테고리, 질문, 답변, 태그
 * @returns 성공 시 "question_id": number
 */
export const useRegisterQuestion = (registerQuestionData: Omit<registerQuestionDataType, 'tag'>) => {
    const router = useRouter();

    return useMutation(async () => instance.post(`${path}`, registerQuestionData), {
        onSuccess: () => {
            router.push('/');
            alert('질문 등록을 성공했습니다.');
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
            } else alert('네트워크 연결 상태를 확인해 주세요.');
        },
    });
};

/**
 * 질문 풀기
 * @param questionId 풀려고 하는 질문 id
 * @param solvingQuestionData 답변
 * @returns useSolvingQuestion API 호출 성공/실패 여부
 */
export const useSolvingQuestion = (questionId: string, answer: string) => {
    const router = useRouter();

    return useMutation(async () => instance.post(`${path}/${questionId}/answer`, { answer: answer }), {
        onSuccess: () => {
            router.push(`/set/0/checkAnswer/${questionId}`);
            alert('질문 풀기를 성공했습니다.');
        },
        onError: (err: AxiosError<AxiosError>) => {
            if (err.response) {
                switch (err.response.status) {
                    case 400:
                        alert('답변을 다시 확인해 주세요.');
                        break;
                    case 401:
                        alert('개발자에게 문의해 주세요.');
                        break;
                    case 409:
                        alert('이미 답변한 질문입니다.');
                        break;
                }
            } else alert('네트워크 연결 상태를 확인해 주세요.');
        },
    });
};

/**
 * 질문 상세 보기 조회 API
 * @param questionId 조회할 질문 id
 * @returns 질문 상세 보기 조회 data
 */
export const useGetQuestionDetail = (questionId: string) => {
    return useQuery(['getQuestionDetail', questionId], async () => {
        const { data } = await instance.get<questionDetailResponse>(`${path}/${questionId}`);
        return data;
    });
};

/**
 * 질문 세트 등록
 * @param registerSetData 질문, 카테고리, question_id: number[]
 * @returns useRegisterSet API 호출 성공/실패 여부
 */
export const useRegisterSet = (registerSetData: Omit<registerSetDataType, 'tagValue'>) => {
    const router = useRouter();

    return useMutation(async () => instance.post(`${path}/set`, registerSetData), {
        onSuccess: () => {
            router.push('/');
            alert('질문 세트 등록을 성공했습니다.');
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
                    case 429:
                        alert('1분 뒤 다시 시도해 주세요.');
                }
            } else alert('네트워크 연결 상태를 확인해 주세요.');
        },
    });
};

/**
 * 질문 내 질문 풀기
 * @param questionId 풀려고 하는 질문 id
 * @param solvingQuestionInSetData 답변
 * @returns useSolvingQuestionInSet API 호출 성공/실패 여부
 */
export const useSolvingQuestionInSet = (questionId: string, answer: string) => {
    const router = useRouter();

    return useMutation(async () => instance.post(`${path}/${questionId}/set`, { answer: answer }), {
        onSuccess: () => {
            router.push('/수정하세요.');
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
            } else alert('네트워크 연결 상태를 확인해 주세요.');
        },
    });
};

/**
 * 질문 세트 풀기
 * @param setId 풀려고 하는 질문 세트 id
 * @returns useSolvingSet API 호출 성공/실패 여부
 */
export const useSolvingSet = (setId: string) => {
    const router = useRouter();

    return useMutation(async () => instance.post(`${path}/set/${setId}`), {
        onSuccess: () => {
            router.push('/');
            alert('질문 세트 풀기를 성공했습니다.');
        },
        onError: (err: AxiosError<AxiosError>) => {
            if (err.response) {
                switch (err.response.status) {
                    case 400:
                        alert('답변을 다시 확인해 주세요.');
                        break;
                    case 401:
                        alert('개발자에게 문의해 주세요.');
                        break;
                }
            } else alert('네트워크 연결 상태를 확인해 주세요.');
        },
    });
};

/**
 * 질문 세트 상세 보기 조회 API
 * @param setId 조회할 질문 세트 id
 * @returns 질문 세트 상세 보기 조회 data
 */
export const useGetSetDetail = (setId: string) => {
    return useQuery(['getSetDetail', setId], async () => {
        const { data } = await instance.get<setDetailResponse>(`${path}/set/${setId}`);
        return data;
    });
};

/**
 * 질문 세트 좋아요
 * @param setId 좋아요 누룰 질문 세트 id
 * @param options onSuccess, onError 등등
 * @returns 성공 시 "is_liked": true
 */
export const useSetLike = (setId: string, options: MutationOptions) => {
    return useMutation(async () => instance.post(`${path}/set/${setId}/like`), {
        ...options,
    });
};

/**
 * 질문 세트 싫어요
 * @param setId 싫어요 누룰 질문 세트 id
 * @param options onSuccess, onError 등등
 * @returns 성공 시 "is_disliked": true
 */
export const useSetDislike = (setId: string, options: MutationOptions) => {
    return useMutation(async () => instance.post(`${path}/set/${setId}/dislike`), {
        ...options,
    });
};

/**
 * 카테고리 태그 목록 조회 API
 * @param category 카테고리 영어로
 * @returns 카테고리 태그 목록 조회 data
 */
export const useGetTags = (category: string) => {
    return useQuery(
        ['getTags', category],
        async () => {
            const queryString = category ? `?category=${category}` : '';
            const { data } = await instance.get<{ tag_list: string[] }>(`${path}/tag${queryString}`);
            return data;
        },
        {
            enabled: category !== '랭킹',
        }
    );
};

/**
 * 질문 목록 조회 API
 * @param category 카테고리 영어로
 * @param tags 선택한 태그들
 * @param keyword 검색할 키워드
 * @returns 질문 목록 조회 data
 */
export const useGetQuestionList = (category: string, tags?: string[], keyword?: string) => {
    return useInfiniteQuery(
        ['getQuestionList', category, tags, keyword],
        async ({ pageParam = 0 }) => {
            const tagsQueryString = tags?.length ? `&tags=${tags}` : '';
            const keywordQueryString = keyword ? `&keyword=${keyword}` : '';
            const { data } = await instance.get<questionListResponse>(
                `${path}?category=${category}&page=${pageParam}${tagsQueryString}${keywordQueryString}`
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
 * 질문 세트 목록 조회 API
 * @param category 카테고리 영어로
 * @param tags 선택한 태그들
 * @param keyword 검색할 키워드
 * @returns 질문 세트 목록 조회 data
 */
export const useGetSetList = (category: string, tags?: string[], keyword?: string) => {
    return useInfiniteQuery(
        ['getSetList', category, tags, keyword],
        async ({ pageParam = 0 }) => {
            const tagsQueryString = tags?.length ? `?&tags=${tags}` : '';
            const keywordQueryString = keyword ? `&keyword=${keyword}` : '';
            const { data } = await instance.get<setListResponse>(
                `${path}/set?category=${category}&page=${pageParam}${tagsQueryString}${keywordQueryString}`
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
 * 질문 랭킹 조회 API
 * @param
 * @returns 질문 랭킹 조회 data
 */
export const useGetQuestionRank = () => {
    return useInfiniteQuery(
        ['getQuestionRank'],
        async ({ pageParam = 0 }) => {
            const { data } = await instance.get<questionListResponse>(`${path}/rank?page=${pageParam}`);
            return data;
        },
        {
            getNextPageParam: (_, a) => a.length,
        }
    );
};

/**
 * 질문 세트 랭킹 조회 API
 * @param
 * @returns 질문 세트 랭킹 조회 data
 */
export const useGetSetRank = () => {
    return useInfiniteQuery(
        ['getSetRank'],
        async ({ pageParam = 0 }) => {
            const { data } = await instance.get<setListResponse>(`${path}/set/rank?page=${pageParam}`);
            return data;
        },
        {
            enabled: false,
            getNextPageParam: (_, a) => a.length,
        }
    );
};

/**
 * 오늘의 질문 조회 API
 * @param
 * @returns 오늘의 질문 조회 data
 */
export const useGetQuestionOfToday = () => {
    return useQuery(['getQuestionOfToday'], async () => {
        const { data } = await instance.get<questionListType>(`${path}/today`);
        return data;
    });
};

/**
 * 인기 질문 조회 API
 * @param
 * @returns 인기 질문 조회 data
 */
export const useGetPopularQuestion = () => {
    return useQuery(['getPopularQuestion'], async () => {
        const { data } = await instance.get<questionListResponse>(`${path}/popular`);
        return data;
    });
};

/**
 * 인기 질문 세트 조회 API
 * @param
 * @returns 인기 질문 세트 조회 data
 */
export const useGetPopularSet = () => {
    return useQuery(['getPopularSet'], async () => {
        const { data } = await instance.get<setListResponse>(`${path}/set/popular`);
        return data;
    });
};

/**
 * 랜덤 질문 조회 API
 * @param category 카테고리 영어로
 * @returns 랜덤 질문 조회 data
 */
export const useGetRandomQuestion = (category?: string) => {
    return useQuery(['getRandomQuestion', category], async () => {
        console.log('api' + category);
        const queryString = category !== 'category' ? `?category=${category}` : '';
        const { data } = await instance.get<randomQuestionResponse>(`${path}/random${queryString}`);
        return data;
    });
};

/**
 * 질문 즐겨찾기
 * @param questionId 즐겨찾기 누룰 질문 id
 * @param options onSuccess, onError 등등
 * @returns 성공 시 "is_favorite": true
 */
export const useQuestionFavorite = (questionId: number, options: MutationOptions) => {
    return useMutation(async () => instance.post(`${path}/${questionId}/favorite`), {
        ...options,
    });
};

/**
 * 질문 세트 즐겨찾기
 * @param setId 즐겨찾기 누룰 질문 세트 id
 * @param options onSuccess, onError 등등
 * @returns 성공 시 "is_favorite": true
 */
export const useSetFavorite = (setId: number, options: MutationOptions) => {
    return useMutation(async () => instance.post(`${path}/set/${setId}/favorite`), {
        ...options,
    });
};

/**
 * 내가 즐겨찾기한 질문 조회 API
 * @param
 * @returns 내가 즐겨찾기한 질문 조회 data
 */
export const useGetFavoriteQuestion = () => {
    return useInfiniteQuery(
        ['getFavoriteQuestion'],
        async ({ pageParam = 0 }) => {
            const { data } = await instance.get<questionListResponse>(`${path}/favorite?page=${pageParam}`);
            return data;
        },
        {
            getNextPageParam: (_, a) => a.length,
        }
    );
};

/**
 * 내가 즐겨찾기한 질문 세트 조회 API
 * @param
 * @returns 내가 즐겨찾기한 질문 세트 조회 data
 */
export const useGetFavoriteSet = () => {
    return useInfiniteQuery(
        ['getFavoriteQuestionSet'],
        async ({ pageParam = 0 }) => {
            const { data } = await instance.get<questionListResponse>(`${path}/favorite/set?page=${pageParam}`);
            return data;
        },
        {
            getNextPageParam: (_, a) => a.length,
        }
    );
};

/**
 * 다른 사람 답변 조회 API
 * @param questionId 조회할 답변의 질문 id
 * @returns 다른 사람 답변 조회 data
 */
export const useGetTheOtherAnswer = (questionId: string) => {
    return useInfiniteQuery(
        ['getTheOtherAnswer', questionId],
        async ({ pageParam = 0 }) => {
            const { data } = await instance.get<theOtherAnswerResponse>(
                `${path}/${questionId}/answer?=page=${pageParam}`
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
 * 난이도 평가
 * @param questionId 난이도 평가할 질문 id
 * @param level 난이도 영어로
 * @param options onSuccess, onError 등등
 * @returns 성공 시 각 난이도 백분율: number
 */
export const useDifficultyEvaluation = (qestionId: string, level: string, options: MutationOptions) => {
    return useMutation(async () => instance.post(`${path}/${qestionId}/difficulty?level=${level}`), {
        ...options,
    });
};

/**
 * 답변 좋아요
 * @param answerId 좋아요 누룰 답변 id
 * @param options onSuccess, onError 등등
 * @returns 성공 시 "is_liked": true
 */
export const useAnswerLike = (answerId: string, options: MutationOptions) => {
    return useMutation(async () => instance.post(`${path}/answer/${answerId}/like`), {
        ...options,
    });
};

/**
 * 답변 싫어요
 * @param answerId 싫어요 누룰 답변 id
 * @param options onSuccess, onError 등등
 * @returns 성공 시 "is_disliked": true
 */
export const useAnswerDislike = (answerId: string, options: MutationOptions) => {
    return useMutation(async () => instance.post(`${path}/answer/${answerId}/dislike`), {
        ...options,
    });
};
