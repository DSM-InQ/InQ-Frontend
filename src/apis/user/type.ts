export interface myInfoResponse {
    username: string;
    join_date: string;
    coin: number;
    job: string;
    job_duration: number;
}

export interface checkResponse {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
}

export interface loginDataType {
    account_id: string;
    password: string;
}

export interface myInfoChangeDataTyp {
    username: string;
    job: string;
    job_duration: number;
}

export interface signupDataType {
    account_id: string;
    username: string;
    password: string;
    password2: string;
    job: string;
    job_duration: number;
}

export interface myQuestionType {
    question_id: number;
    author_id: number;
    username: string;
    job: string;
    job_duration: string;
    question: string;
    created_at: string;
    category: string;
    tags: string[];
    is_favorite: boolean;
    exemplary_answer: string;
}

export interface solvedQuestionResponse {
    has_next: boolean;
    solved_question_list: solvedQuestionListType[];
}

export interface solvedQuestionType {
    type: string;
    question_id: number;
    question: string;
    solved_at: string;
    category: string;
    tags: string[];
    answer: string;
    is_answered: boolean;
}

export interface solvedQuestionListType {
    type: string;
    question_id: number;
    question: string;
    question_set_id: number;
    question_set_name: string;
    solved_at: string;
    category: string;
    tags: string[];
    answer: string;
    is_answered: boolean;
    question_list: solvedQuestionType[];
}
