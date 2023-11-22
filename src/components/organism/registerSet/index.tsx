'use client';
import { useRegisterSet } from '@/apis/question';
import { useGetMyQuestion } from '@/apis/user';
import Button from '@/components/designSystem/common/button';
import { DropDown } from '@/components/designSystem/common/dropDown';
import { Input } from '@/components/designSystem/common/input';
import { Stack } from '@/components/designSystem/common/stack';
import Tag from '@/components/designSystem/register/tag';
import { Textarea } from '@/components/designSystem/register/textarea';
import { useForm } from '@/hooks/useForm';
import { color } from '@/styles/theme';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { QuestionBox } from '@/components/designSystem/myInfo/questionBox';

/** @returns 질문 세트 등록 component */
export default function RegisterSetCompo() {
    /** 내가 등록한 질문 조회 data */
    const { data: myQuestionData, refetch: myQuestionRefetch } = useGetMyQuestion();
    /** 질문 세트 등록 data */
    const {
        form: signForm,
        setForm: setSignForm,
        handleChange: signFormChange,
    } = useForm({
        question_set_name: '',
        description: '',
        category: 'DEVELOPMENT',
        question_id: [],
        tagValue: '',
        tag: [],
    });
    const { question_set_name, description, category, question_id, tagValue, tag } = signForm;

    const router = useRouter();
    // const [sortType, setSortType] = useState(true);
    const options = [
        'DEVELOPMENT', //  개발
        'MARKETING', //    마케팅
        'PLANNING', //     기획
        'COMMON_SENSE', // 상식
        'LEARNING', //     학습
        'CAREER', //       경력
        'PERSONALITY', //  인성
    ];

    /** 태그 추가하는 함수 */
    const AddTag = () => {
        setSignForm((prevForm: any) => ({
            ...prevForm,
            tag: [...prevForm.tag, tagValue],
        }));
    };

    /** 태그 제거하는 함수 */
    const RemoveTag = (i: number) => {
        setSignForm((prevForm: any) => {
            const updateTags = [...prevForm.tag];
            updateTags.splice(i, 1);

            return {
                ...prevForm,
                tag: updateTags,
            };
        });
    };

    const CheckBoxClick = (questionId: number) => {
        setSignForm((prevForm: any) => ({
            ...prevForm,
            question_id: [...prevForm.question_id, questionId],
        }));
    };

    /** 질문 세트 등록 API 호출 */
    const { mutate } = useRegisterSet(signForm);

    return (
        <Container>
            <Wrapper>
                <Stack width="100%" justify="space-between">
                    <Title>질문 세트 만들기</Title>

                    <Stack width="10%" gap={40}>
                        <Button onClick={() => mutate()}>등록하기</Button>
                    </Stack>
                </Stack>

                <Stack direction="column" gap={20}>
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
                                name="tagValue"
                                value={tagValue}
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
                        {tag.map((v, i) => (
                            <Tag key={i} value={v} onClick={() => RemoveTag(i)} />
                        ))}
                    </Stack>
                </Stack>

                <Stack width="100%" direction="column" align="flex-end" gap={40}>
                    <Input
                        placeholder="질문 세트 제목을 입력해 주세요."
                        label="질문 세트 제목"
                        name="question_set_name"
                        value={question_set_name}
                        onChange={signFormChange}
                    />

                    <Textarea
                        placeholder="설명을 입력해 주세요."
                        label="설명"
                        name="description"
                        value={description}
                        height={300}
                        onChange={signFormChange}
                    />

                    <Stack width="100%" direction="column" justify="start" gap={40}>
                        <Title>내가 등록한 질문</Title>

                        {myQuestionData?.pages
                            .flatMap((prev) => prev)
                            .map((v, i) => {
                                return (
                                    v !== undefined && (
                                        <QuestionBox
                                            key={i}
                                            data={v}
                                            refetch={myQuestionRefetch}
                                            checkBox={true}
                                            onCheckBoxClick={CheckBoxClick}
                                        />
                                    )
                                );
                            })}
                    </Stack>
                </Stack>
            </Wrapper>
        </Container>
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
    gap: 40px;
`;

const Title = styled.div`
    font-size: 22px;
    font-weight: 700;
    color: ${color.primaryDefault};
`;

const Label = styled.div`
    font-size: 14px;
    font-weight: 400;
    margin: 6px;
    color: ${color.gray6};
`;
