export interface myInfoResponse {
    username: string;
    join_date: string;
    coin: number;
    job: string;
    job_duration: number;
}

export interface myAnswerResponse {
    solved_question_list: Array<object>;
}
