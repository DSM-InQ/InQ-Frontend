'use client';
import React, { useState } from 'react';
import { useForm } from '@/hooks/useForm';
import styled from 'styled-components';
import { color } from '@/styles/theme';
import { Input } from '@/components/designSystem/common/input';
import { Textarea } from '@/components/designSystem/register/textarea';
import { Stack } from '@/components/designSystem/common/stack';
import { DropDown } from '@/components/designSystem/common/dropDown';
import Tag from '@/components/designSystem/register/tag';
import { useRegisterQuestion } from '@/apis/question';
import Button from '@/components/designSystem/common/button';

/** @returns 질문 등록 component */
export default function RegisterQuestionCompo() {
    /** 질문 등록 data */
    const {
        form: signForm,
        setForm: setSignForm,
        handleChange: signFormChange,
    } = useForm({
        category: 'DEVELOPMENT',
        question: '',
        answer: '',
        tag: '',
        tags: [],
    });
    /** 질문 등록 data를 구조분해할당 해놓은 부분 */
    const { category, question, answer, tag, tags } = signForm;
    /** 면접 예상 시간 */
    const [time, setTime] = useState<number>(0);
    /** 카테고리 data */
    const options = [
        'DEVELOPMENT', // 개발
        'MARKETING', // 마케팅
        'PLANNING', // 기획
        'COMMON_SENSE', // 상식
        'LEARNING', // 학습
        'CAREER', // 경력
        'PERSONALITY', // 인성
    ];

    /** 태그 추가하는 함수 */
    const AddTag = () => {
        setSignForm((prevForm: any) => ({
            ...prevForm,
            tags: [...prevForm.tags, tag],
        }));
    };

    /** 태그 제거하는 함수 */
    const RemoveTag = (i: number) => {
        setSignForm((prevForm: any) => {
            const updateTags = [...prevForm.tags];
            updateTags.splice(i, 1);

            return {
                ...prevForm,
                tags: updateTags,
            };
        });
    };

    /** 면접 예상 시간 계산하는 함수 */
    const TimeCalculation = () => {
        setTime(~~(answer.replace(/ /gi, '').length / 6 / 60));
    };

    /** 질문 등록 API 호출 */
    const { mutate } = useRegisterQuestion(signForm);

    return (
        <>
            <Container>
                <Wrapper>
                    <Title>질문 만들기</Title>

                    <TopWrapper>
                        <Stack gap={30}>
                            <Stack direction="column">
                                <Label>카테고리</Label>
                                <DropDown
                                    option={options}
                                    value={category}
                                    onChange={(v) => {
                                        setSignForm((prevForm: any) => ({
                                            ...prevForm,
                                            category: v,
                                        }));
                                    }}
                                    width="200px"
                                    border={`1px solid ${color.gray5}`}
                                />
                            </Stack>

                            <Stack width="500px">
                                <Input
                                    placeholder="태그를 작성해주세요."
                                    label="태그"
                                    name="tag"
                                    value={tag}
                                    onKeyDown={(e) => {
                                        if (!e.nativeEvent.isComposing && e.key === 'Enter') {
                                            AddTag();
                                        }
                                    }}
                                    onChange={signFormChange}
                                />
                            </Stack>
                        </Stack>

                        <Stack gap={15}>
                            {tags.map((v, i) => (
                                <Tag
                                    key={i}
                                    value={v}
                                    onClick={() => {
                                        RemoveTag(i);
                                    }}
                                />
                            ))}
                        </Stack>
                    </TopWrapper>

                    <BottomWrapper>
                        <Input
                            placeholder="질문을 작성해주세요."
                            label="질문"
                            name="question"
                            value={question}
                            onChange={signFormChange}
                        />
                        <Textarea
                            placeholder="질문에 대한 답변 예시를 작성해주세요."
                            label="예시 답변"
                            name="answer"
                            value={answer}
                            height={300}
                            onChange={(e) => {
                                signFormChange(e);
                                TimeCalculation();
                            }}
                        />
                        <TimeWrapper>{`약 ${time}분`}</TimeWrapper>

                        <BtnWrapper>
                            <Button onClick={() => mutate()}>등록하기</Button>
                        </BtnWrapper>
                    </BottomWrapper>
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
    padding: 50px 0 50px 0;
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

const TopWrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
    gap: 20px;
`;

const Label = styled.div`
    font-size: 14px;
    font-weight: 400;
    margin: 6px;
    color: ${color.gray6};
`;

const BottomWrapper = styled.div`
    width: 100%;
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
