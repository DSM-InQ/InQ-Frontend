'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { color } from '@/styles/theme';
import { Stack } from '@/components/designSystem/common/stack';
import Button from '@/components/designSystem/common/button';

interface propsType {
    questionId: string;
}

export default function DifficultyEvaluation({ questionId }: propsType) {
    const [answer, setAnswer] = useState<string>('이 질문은 대답하기에 어느 정도로 어려운 질문인가요?');
    const [difficultyBtns, setDifficultyBtns] = useState([
        {
            difficulty: '매우 쉬움',
            status: false,
            color: color.gray2,
        },
        {
            difficulty: '쉬움',
            status: false,
            color: '#DEDDFF',
        },
        {
            difficulty: '보통',
            status: false,
            color: '#C2C0FF',
        },
        {
            difficulty: '어려움',
            status: false,
            color: color.primaryDefault,
        },
        {
            difficulty: '매우 어려움',
            status: false,
            color: '#5A4CF4',
        },
    ]);

    // const { mutate: difficultyEvaluationMutate } = useDifficultyEvaluation(
    //     questionId,
    //     getValueByKey(difficultyType, difficultyBtns[0].difficulty),
    //     {
    //         onSuccess: (res: any) => {
    //             setAnswer('수정하세요.');
    //             alert('난이도 평가 제출이 완료되었습니다.');
    //         },
    //         onError: () => {
    //             alert('난이도 평가 제출이 실패했습니다.');
    //         },
    //     }
    // );

    return (
        <>
            <Container>
                <Title>난이도 평가</Title>

                <Stack width="100%" justify="center">
                    <Stack gap={70}>
                        {difficultyBtns.map((v, i) => (
                            <Stack key={i} width="70px" direction="column" align="center" gap={10}>
                                <Btn
                                    onClick={() => {
                                        const updated = [...difficultyBtns];
                                        updated[i].status = !updated[i].status;
                                        setDifficultyBtns(updated);
                                    }}
                                    style={{
                                        border: v.status === false ? `1px solid ${color.gray5}` : 'none',
                                        background: v.status === false ? 'transparent' : v.color,
                                    }}
                                />

                                <Text>{v.difficulty}</Text>
                            </Stack>
                        ))}
                    </Stack>
                </Stack>

                <Text>{answer}</Text>

                <Stack justify="end">
                    <Button
                        onClick={() => {
                            const selectedDifficulty = difficultyBtns.filter((v) => v.status);

                            if (selectedDifficulty.length === 0) alert('난이도 평가를 선택해 주세요.');
                            else if (selectedDifficulty.length > 1) alert('난이도 평가를 하나만 선택해 주세요.');
                            else {
                                alert('난이도 제출을 성공했습니다.');
                                // difficultyEvaluationMutate();
                            }
                        }}
                        width="80px"
                    >
                        제출
                    </Button>
                </Stack>
            </Container>
        </>
    );
}

const Container = styled.div`
    padding: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    border: 1px solid ${color.gray5};
    border-radius: 4px;
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: ${color.gray6};
`;

const Btn = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 50px;
`;

const Text = styled.div`
    text-align: center;
    font-size: 13px;
    font-weight: 500;
    color: ${color.gray6};
`;
