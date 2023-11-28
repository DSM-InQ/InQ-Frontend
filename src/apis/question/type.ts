/** 질문 등록 POST */
export interface registerQuestionDataType {
    category: string;
    question: string;
    answer: string;
    tag: string;
    tags: string[];
}

/** 질문 상세 보기 조회 GET */
export interface questionDetailResponse {
    question_id: number;
    author_id: number;
    username: string;
    job: string;
    job_duration: string;
    question: string;
    category: string;
    tags: string[];
    is_favorite: boolean;
    exemplary_answer: exemplaryAnswerType;
    created_at: string;
}

export interface exemplaryAnswerType {
    question_id: number;
    username: string;
    job: string;
    job_duration: number;
    answer: string;
    like_count: number;
    is_liked: boolean;
    dislike_count: number;
    is_disliked: boolean;
    comments: string[];
}

/** 질문 세트 등록 POST */
export interface registerSetDataType {
    question_set_name: string;
    description: string;
    category: string;
    question_id: number[];
    tagValue: string;
    tag: string[];
}

/** 질문 세트 내 질문 풀기 POST */
export interface solvingQuestionInSetDataType {
    answer: string;
}

/** 질문 세트 상세 보기 조회 GET */
export interface setDetailResponse {
    question_set_id: number;
    name: string;
    created_at: string;
    description: string;
    username: string;
    job: string;
    job_duration: string;
    category: {
        category: string;
        count: number;
    }[];
    like_count: number;
    dislike_count: number;
    view_count: number;
    is_liked: boolean;
    is_disliked: boolean;
    is_favorite: boolean;
    comments: {
        username: string;
        job: string;
        job_duration: number;
        comment: string;
    }[];
    question_id_list: number[];
}

/** 질문 목록 조회 GET */
export interface questionListResponse {
    has_next: boolean;
    question_list: questionListType[];
}

/** 질문 세트 목록 조회 GET */
export interface setListResponse {
    has_next: boolean;
    question_sets_list: questionListType[];
}

/** 랜덤 질문 조회 GET */
export interface randomQuestionResponse {
    question_id: number;
    username: string;
    job: string;
    job_duration: number;
    question: string;
    category: string;
    tags: string[];
    is_answered: boolean;
    is_favorite: boolean;
    created_at: string;
}

/** 다른 사람 답변 조회 GET */
export interface theOtherAnswerResponse {
    has_next: boolean;
    answer_list: questionListType[];
}

export interface questionListType {
    question_set_id: number;
    question_id: number;
    rank: number;
    question_set_name: string;
    username: string;
    job: string;
    job_duration: string;
    question: string;
    answer: string;
    category: string;
    tags: string[];
    is_answered: boolean;
    is_favorite: boolean;
    like_count: number;
    is_liked: boolean;
    dislike_count: number;
    is_disliked: boolean;
    view_count: number;
    created_at: string;
    comment: commentType[];
}

export interface commentType {
    username: string;
    job: string;
    job_duration: string;
    comment: string;
    is_private: boolean;
    is_accessible: boolean;
}

/** 난이도 평가 SUCCESS */
export interface difficultyLevelResponse {
    VERY_EASY: number;
    EASY: number;
    NORMAL: number;
    HARD: number;
    VERY_HARD: number;
}
