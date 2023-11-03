export interface questionSetResponse {
    has_next: boolean;
    question_sets_list: questionListType[];
}

export interface questionResponse {
    has_next: boolean;
    question_list: questionListType[];
}

export interface questionListType {
    question_id: number;
    question: string;
    question_set_id: number;
    question_set_name: string;
    created_at: string;
    category: string;
    username: string;
    job: string;
    job_duration: string;
    tags: string[];
    is_answered: boolean;
    is_favorite: boolean;
    like_count: number;
    view_count: number;
}

export interface questionSetDetailResponse {
    question_id: number;
    name: string;
    created_at: Date;
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
}
