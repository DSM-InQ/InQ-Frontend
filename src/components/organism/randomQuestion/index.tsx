'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { color } from '@/styles/theme';
import { useGetRandomQuestion, useSolvingQuestion } from '@/apis/question';
import { useForm } from '@/hooks/useForm';
import { getValueByKey } from '@/utils/useGetPropertyKey';
import { categoryType } from '@/utils/Translation';
import { Stack } from '@/components/designSystem/common/stack';
import { Textarea } from '@/components/designSystem/register/textarea';
import Button from '@/components/designSystem/common/button';

interface propsType {
    category: string;
}

/**
 * @returns 랜덤 질문 조회 component
 * */
export default function RandomQuestionCompo({ category }: propsType) {
    /** 면접 예상 시간 */
    const [time, setTime] = useState(0);
    /** 랜덤 질문 조회 data */
    const {
        data: randomQuestionData,
        isLoading: randomQuestionIsLoading,
        isError: randomQuestionIsError,
    } = useGetRandomQuestion(category);

    const { form: signFrom, handleChange: signFormChange } = useForm({
        answer: '',
    });
    const { answer } = signFrom;

    /** 면접 예상 시간 계산하는 함수 */
    const TimeCalculation = () => {
        setTime(~~(answer.replace(/ /gi, '').length / 6 / 60));
    };

    const { mutate } = useSolvingQuestion(String(randomQuestionData?.question_id), answer);

    return (
        <>
            <Container>
                <Wrapper>
                    {randomQuestionIsLoading && <div>로딩 중...</div>}
                    {randomQuestionIsError && <div>오류</div>}
                    {randomQuestionData && (
                        <>
                            <Title>{`${getValueByKey(categoryType, randomQuestionData.category)} 질문`}</Title>
                            <Title style={{ color: color.gray10 }}>{randomQuestionData?.question}</Title>
                        </>
                    )}

                    <Stack width="1000px" direction="column" align="flex-end" gap={30}>
                        <Textarea
                            placeholder="질문에 대한 답변을 작성해 주세요."
                            label="답변"
                            name="answer"
                            value={answer}
                            height={300}
                            onChange={(e: any) => {
                                signFormChange(e);
                                TimeCalculation();
                            }}
                        />
                        <Time>{`약 ${time}분`}</Time>

                        <Stack width="10%" gap={30}>
                            <Button
                                onClick={() => {
                                    if (answer === '') alert('답변을 작성해 주세요.');
                                    else mutate();
                                }}
                            >
                                다음
                            </Button>
                        </Stack>
                    </Stack>
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
const Time = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: ${color.gray6};
`;

const BtnWrapper = styled.div`
    width: 10%;
    display: flex;
    gap: 30px;
`;
