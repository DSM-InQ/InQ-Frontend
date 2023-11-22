'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useGetQuestionDetail } from '@/apis/question';
import { useForm } from '@/hooks/useForm';
import { getValueByKey } from '@/utils/useGetPropertyKey';
import { categoryType } from '@/utils/Translation';
import { color } from '@/styles/theme';
import { Stack } from '@/components/designSystem/common/stack';
import { Textarea } from '@/components/designSystem/register/textarea';
import Button from '@/components/designSystem/common/button';

interface propsType {
    questionId: string;
}

/**
 * @param id 질문 id
 * @returns 질문 풀기 page
 */
export default function SolvingQuestionCompo({ questionId }: propsType) {
    /** 질문 풀기 data */
    const { form: signForm, handleChange: signFormChange } = useForm({
        answer: '',
    });
    const { answer } = signForm;

    const router = useRouter();
    /** 면접 예상시간 */
    const [time, setTime] = useState(0);
    /** 질문 상세 보기 조회 data */
    const {
        data: questionDetailData,
        isLoading: questionDetailIsLoading,
        isError: questionDetailIsError,
    } = useGetQuestionDetail(questionId);

    /** 면접 예상시간 */
    const TimeCalculation = () => {
        setTime(~~(answer.replace(/ /gi, '').length / 6 / 60));
    };

    return (
        <>
            <Container>
                <Wrapper>
                    {questionDetailIsLoading && <div>로딩 중...</div>}
                    {questionDetailIsError && <div>오류</div>}
                    {questionDetailData && (
                        <>
                            <Title>{`${getValueByKey(categoryType, questionDetailData?.category)} 질문`}</Title>
                            <Title style={{ color: color.gray10 }}>{questionDetailData?.question}</Title>
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

                        <TimeWrapper>{`약 ${time}분`}</TimeWrapper>

                        <Stack width="10%" gap={30}>
                            <Button
                                onClick={() => {
                                    if (answer === '') alert('답변을 작성해 주세요.');
                                    else !!questionId && router.push(`/checkAnswer/${questionId}`);
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

const TimeWrapper = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: ${color.gray6};
`;
