"use client";
import { color } from "@/styles/theme";
import React, { useEffect } from "react";
import styled from "styled-components";
import { Text } from "@/components/designSystem/common/text";
import { useGetPopularQuestion, useGetQuestionSetRank } from "@/apis/question";
import PopularQuestionBox from "@/components/designSystem/main/popularQuestionBox";
import { Stack } from "@/components/designSystem/common/stack";
import PopularQuestionSetBox from "@/components/designSystem/main/popularQuestionSetBox";
import { useRouter } from "next/navigation";

/** @returns 인기 질문/질문세트 components */
export default function PopularQuestionAndQuestionSet() {
    const router = useRouter();
    const { data: popularQuestion } = useGetPopularQuestion();
    const { data: popularQuestionSet, refetch } = useGetQuestionSetRank();
    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Container>
            <Stack gap={19}>
                <Stack direction="column" gap={8}>
                    <Text size={18} color={color.gray6}>
                        인기 질문
                    </Text>
                    <Stack direction="column" gap={21}>
                        {popularQuestion?.question_list
                            .slice(0, 4)
                            .map((item) => {
                                return (
                                    <PopularQuestionBox
                                        key={item.question_id}
                                        data={item}
                                    />
                                );
                            })}
                    </Stack>
                </Stack>
                <Stack direction="column" gap={8}>
                    <Text size={18} color={color.gray6}>
                        인기 질문 세트
                    </Text>
                    <Stack direction="column" gap={20}>
                        {popularQuestionSet?.pages[0].question_sets_list
                            ?.slice(0, 2)
                            .map((item, i) => {
                                return (
                                    <PopularQuestionSetBox
                                        index={i}
                                        key={item.question_set_id}
                                        data={item}
                                    />
                                );
                            })}
                    </Stack>
                </Stack>
            </Stack>
            <Text
                size={18}
                color={color.gray5}
                cursor="pointer"
                onClick={() => {
                    router.push("/searchQuestion");
                }}
            >
                {"질문 / 질문 세트 검색 >"}
            </Text>
        </Container>
    );
}

const Container = styled.div`
    width: 1100px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 16px;
`;
