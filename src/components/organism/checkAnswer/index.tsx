'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { color } from '@/styles/theme';
import { Stack } from '@/components/designSystem/common/stack';
import { useGetQuestionDetail, useGetSetDetail } from '@/apis/question';
import { getValueByKey } from '@/utils/useGetPropertyKey';
import { categoryType } from '@/utils/Translation';
import Button from '@/components/designSystem/common/button';
import DifficultyEvaluation from '@/components/element/checkAnswer/difficultyEvaluation';

interface propsType {
    setId: string;
    questionId: string;
}

export default function CheckAnswerCompo({ setId, questionId }: propsType) {
    const [count, setCount] = useState(1);
    const router = useRouter();

    const {
        data: questionDetailData,
        isLoading: questionDetailIsLoading,
        isError: questionDetailIsError,
    } = useGetQuestionDetail(questionId);
    const { data: setDetailData, isLoading: setDetailIsLoading, isError: setDetailIsError } = useGetSetDetail(setId);

    return (
        <>
            <Container>
                <Wrapper>
                    <Stack justify="space-between">
                        {questionDetailIsLoading && <div>로딩 중...</div>}
                        {questionDetailIsError && <div>오류</div>}
                        {questionDetailData && (
                            <Title>{`${getValueByKey(categoryType, questionDetailData.category)} 질문`}</Title>
                        )}

                        <Stack gap={20}>
                            <Button onClick={() => router.back()} width="80px" type="Outline">
                                이전
                            </Button>

                            <Button
                                onClick={() => {
                                    if (count === 1) {
                                        router.push(
                                            `/set/${setId}/checkAnswer/${setDetailData?.question_id_list[count]}`
                                        );
                                        setCount(count + 1);
                                    } else {
                                        alert('질문 세트 풀기를 성공했습니다.');
                                    }
                                }}
                                width="80px"
                            >
                                다음
                            </Button>
                        </Stack>
                    </Stack>

                    {questionDetailIsLoading && <div>로딩 중...</div>}
                    {questionDetailIsError && <div>오류</div>}
                    {questionDetailData && (
                        <>
                            <Title style={{ fontSize: '28px', color: color.gray10 }}>
                                {questionDetailData?.question}
                            </Title>

                            <Stack direction="column" gap={20}>
                                <Text>{`${questionDetailData?.username} · ${questionDetailData?.job} ${questionDetailData?.job_duration}년차`}</Text>

                                <Stack gap={10}>
                                    {questionDetailData.tags.map((v, i) => (
                                        <TagWrapper key={i}>{`# ${v}`}</TagWrapper>
                                    ))}
                                </Stack>
                            </Stack>
                        </>
                    )}

                    <DifficultyEvaluation questionId={questionId} />
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
    gap: 20px;
`;

const Title = styled.div`
    font-size: 22px;
    font-weight: 700;
    color: ${color.primaryDefault};
`;

const Text = styled.div`
    font-size: 18px;
    font-weight: 400;
`;
const Comment = styled.div`
    font-size: 13px;
    font-weight: 500;
`;

const TagWrapper = styled.div`
    padding: 0px 10px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${color.gray3};
    border-radius: 50px;

    font-size: 13px;
    font-weight: 400;
    color: ${color.gray6};
`;

const CommentWrapper = styled.div`
    padding: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid ${color.gray5};
    border-radius: 4px;
`;

const CommentTitle = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: ${color.primaryDefault};
`;

const CommentInput = styled.input`
    width: 100%;
    height: 46px;
    border: 1px solid ${color.gray5};
    border-radius: 4px;
    font-size: 16px;
    font-weight: 400;
    padding: 0 54px 0 15px;
`;

const OtherCommentWrapper = styled.div`
    padding: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid ${color.gray5};
    border-radius: 4px;
    font-size: 16px;
    font-weight: 400;
    gap: 5px;
`;
