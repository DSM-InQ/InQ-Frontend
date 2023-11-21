"use client";
import React, { useState } from "react";
import { color } from "@/styles/theme";
import styled from "styled-components";
import { Stack } from "@/components/designSystem/common/stack";
import Image from "next/image";
import sortImg from "public/assets/svg/sort.svg";
import { Text } from "@/components/designSystem/common/text";
import { QuestionBox } from "@/components/designSystem/questionFinder/questionBox";
import { useGetFavoriteSet } from "@/apis/question";

export const FavoriteQuestionSet = () => {
    const {
        data: myQuestionList,
        fetchNextPage: myQuestionFetchNextPage,
        refetch: myQuestionRefetch,
        isFetching: myQuestionIsFetching,
    } = useGetFavoriteSet();
    const [sortType, setSortType] = useState<boolean>(true);

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
                    즐겨찾기한 질문 세트
                </Text>
                <SortBtn onClick={() => setSortType((prev) => !prev)}>
                    <SortImg src={sortImg} alt="" $sortType={sortType} />
                    {sortType ? "최신순" : "오래된순"}
                </SortBtn>
            </Stack>
            {myQuestionList?.pages
                .flatMap((prev) => prev.question_list)
                .sort(
                    (a, b) =>
                        new Date(
                            sortType ? b.created_at : a.created_at
                        ).getTime() -
                        new Date(
                            sortType ? a.created_at : b.created_at
                        ).getTime()
                )
                .map((item, i) => {
                    return (
                        item !== undefined && (
                            <QuestionBox
                                key={i}
                                data={item}
                                refetch={myQuestionRefetch}
                                width="100%"
                            />
                        )
                    );
                })}
            {!myQuestionIsFetching &&
                !myQuestionList?.pages.at(-1)?.has_next! &&
                !myQuestionList?.pages.length && (
                    <AddQuestion onClick={() => myQuestionFetchNextPage()}>
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
