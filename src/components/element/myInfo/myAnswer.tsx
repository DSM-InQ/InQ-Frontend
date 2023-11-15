"use client";
import React, { useState } from "react";
import { color } from "@/styles/theme";
import styled from "styled-components";
import { Stack } from "@/components/designSystem/common/stack";
import Image from "next/image";
import { useGetMyAnswerQuestion } from "@/apis/user";
import sortImg from "public/assets/svg/sort.svg";
import { Text } from "@/components/designSystem/common/text";
import { MyAnswerBox } from "@/components/designSystem/myInfo/myAnswerBox";
import { MyAnswerSetBox } from "@/components/designSystem/myInfo/myAnswerSetBox";

export const MyAnswer = () => {
    const {
        data: myAnswerQuestion,
        fetchNextPage: myAnswerQuestionFetchNextPage,
        isFetching: myAnswerQuestionIsFetching,
    } = useGetMyAnswerQuestion();
    const [sortType, setSortType] = useState<boolean>(true);
    console.log(myAnswerQuestion);
    return (
        <Stack
            display="inline-flex"
            direction="column"
            align="center"
            gap={30}
            width="1086px"
        >
            <Stack width="100%" justify="space-between">
                <Text size={22} weight={600} color={color.primaryDefault}>
                    답변 내역
                </Text>
                <SortBtn onClick={() => setSortType((prev) => !prev)}>
                    <SortImg src={sortImg} alt="" $sortType={sortType} />
                    {sortType ? "최신순" : "오래된순"}
                </SortBtn>
            </Stack>
            {myAnswerQuestion?.pages
                .flatMap((prev) => prev.solved_question_list)
                .sort(
                    (a, b) =>
                        new Date(
                            sortType ? b.solved_at : a.solved_at
                        ).getTime() -
                        new Date(sortType ? a.solved_at : b.solved_at).getTime()
                )
                .map((item, i) => {
                    return (
                        item !== undefined &&
                        (item.type === "QUESTION" ? (
                            <MyAnswerBox key={i} data={item} />
                        ) : (
                            <MyAnswerSetBox key={i} data={item} />
                        ))
                    );
                })}
            {!myAnswerQuestionIsFetching &&
                !myAnswerQuestion?.pages.at(-1)?.has_next! &&
                !myAnswerQuestion?.pages.length && (
                    <AddQuestion
                        onClick={() => myAnswerQuestionFetchNextPage()}
                    >
                        더보기 +
                    </AddQuestion>
                )}
        </Stack>
    );
};

const SortBtn = styled.button`
    position: relative;
    width: 99px;
    height: 45px;
    display: flex;
    padding-left: 30px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid ${color.gray4};
    background: ${color.gray1};
    font-size: 14px;
    font-weight: 700;
    gap: 10px;
    cursor: pointer;
    &:disabled {
        background: ${color.gray3};
        cursor: not-allowed;
    }
`;

const SortImg = styled(Image)<{ $sortType: boolean }>`
    rotate: ${({ $sortType }) => ($sortType ? "180deg" : "0deg")};
    transition: 0.5s;
    position: absolute;
    left: 14px;
`;

const AddQuestion = styled.button`
    border: none;
    border-radius: 24px;
    background: ${color.gray2};
    display: flex;
    padding: 14px 16px;
    justify-content: center;
    align-items: center;
    color: ${color.gray6};
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
`;
