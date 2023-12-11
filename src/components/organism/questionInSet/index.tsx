'use client';
import React, { useEffect, useState } from 'react';
import { color } from '@/styles/theme';
import styled from 'styled-components';
import { useForm } from '@/hooks/useForm';
import Button from '@/components/designSystem/common/button';
import { Textarea } from '@/components/designSystem/register/textarea';
import { useSolvingQuestionInSet, useGetQuestionDetail, useGetSetDetail } from '@/apis/question';
import { questionDetailResponse } from '@/apis/question/type';
import { useRouter } from 'next/navigation';
import { getValueByKey } from '@/utils/useGetPropertyKey';
import { categoryType } from '@/utils/Translation';

interface propsType {
    setId: string;
    questionId: string;
}

/**
 * @param id 질문 id
 * @returns 질문 풀기 page
 * */
export default function QuestionInSetCompo({ setId, questionId }: propsType) {
    const [count, setCount] = useState(1);
    const [index, setIndex] = useState(0);
    // const [num, setNum] = useState(0);
    // const [test, setTest] = useState(0);
    // const [value, setValue] = useState(count);
    const router = useRouter();
    /** 질문 상세보기 data */
    const { data, isLoading, isError } = useGetQuestionDetail(questionId);

    const { data: set } = useGetSetDetail(setId);
    /** 면접 예상 시간 */
    const [time, setTime] = useState(0);
    /** 질문 풀기 data */
    const { form: signForm, handleChange: signFormChange } = useForm({
        answer: '',
    });
    /** 질문 풀기 data를 구조분해할당 해놓은 부분 */
    const { answer } = signForm;

    /** 면접 예상 시간 계산하는 함수 */
    const TimeCalculation = () => {
        setTime(~~(answer.replace(/ /gi, '').length / 6 / 60));
    };

    const { mutate } = useSolvingQuestionInSet(
        String(set?.question_id_list !== undefined && set?.question_id_list[index]),
        answer
    );

    useEffect(() => {
        console.log(setId);
    });

    return (
        <>
            <Container>
                <Wrapper>
                    {isLoading && <div>로딩 중...</div>}
                    {isError && <div>오류</div>}
                    {data && <Title>{`${getValueByKey(categoryType, data.category)} 질문`}</Title>}
                    <Title style={{ color: color.gray10 }}>{data?.question}</Title>

                    <EndWrapper>
                        <Textarea
                            placeholder="질문에 대한 답변 예시를 작성해주세요."
                            label="예시 답변"
                            name="answer"
                            value={answer}
                            height={300}
                            onChange={(e: any) => {
                                signFormChange(e);
                                TimeCalculation();
                            }}
                        />
                        <TimeWrapper>{`약 ${time}분`}</TimeWrapper>

                        <BtnWrapper>
                            <Button
                                onClick={() => {
                                    if (answer === '') alert('답변을 작성해 주세요.');
                                    else if (count === 1) {
                                        mutate();
                                        router.push(`/set/${setId}/questionInSet/${set?.question_id_list[count]}`);
                                        setCount(count + 1);
                                        setIndex(index + 1);
                                    } else {
                                        router.push(`/set/${setId}/checkAnswer/${set?.question_id_list[0]}`);
                                    }
                                }}
                            >
                                다음
                            </Button>
                        </BtnWrapper>
                    </EndWrapper>
                </Wrapper>
            </Container>
        </>
    );
}

const Container = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.div`
    padding: 100px 0 100px 0;
    width: 1000px;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const Title = styled.div`
    font-size: 22px;
    font-weight: 700;
    color: ${color.primaryDefault};
`;

const EndWrapper = styled.div`
    width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 30px;
`;
const TimeWrapper = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: ${color.gray6};
`;

const BtnWrapper = styled.div`
    width: 10%;
    display: flex;
    gap: 30px;
`;
