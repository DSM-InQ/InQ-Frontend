export interface questionResponse {
    has_next: boolean;
    question_list: questionListType[];
}

export interface questionListType {
    question_id: number;
    question: string;
    created_at: string;
    category: string;
    username: string;
    job: string;
    job_duration: string;
    tags: string[];
    is_answered: boolean;
    is_favorite: boolean;
    like_count: number;
    answer_count: number;
}
