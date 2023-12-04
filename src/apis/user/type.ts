/** 회원가입 POST */
export interface signupDataType {
    account_id: string;
    username: string;
    password: string;
    password2: string;
    job: string;
    job_duration: number;
}

/** 로그인 POST */
export interface loginDataType {
    account_id: string;
    password: string;
}

/** 유저정보 조회 GET */
export interface myInfoResponse {
    username: string;
    join_date: string;
    coin: number;
    job: string;
    job_duration: number;
}

/** 출석체크 조회 GET */
export interface checkResponse {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
}

/** 답변 내역 조회 조회 GET */
export interface myAnswerResponse {
    has_next: boolean;
    solved_question_list: solvedQuestionListType[];
}

export interface solvedQuestionListType {
    type: string;
    question_set_id: string;
    question_id: number;
    question_set_name: string;
    question: string;
    category: string;
    tags: string[];
    solved_at: string;
    answer: string;
    is_answered: boolean;
    username?: string;
    job?: string;
    job_duration?: number;
    question_list: solvedQuestionListType[];
}

/** 내가 등록한 질문 조회 GET */
export interface myQuestionResponse {
    has_next: boolean;
    question_list: myQuestionType[];
}

export interface myQuestionType {
    question_id: number;
    author_id: number;
    username: string;
    job: string;
    job_duration: string;
    question: string;
    category: string;
    tags: string[];
    is_favorite: boolean;
    exemplary_answer: string;
    created_at: string;
}
