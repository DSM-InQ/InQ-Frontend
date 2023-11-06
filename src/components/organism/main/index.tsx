"use client";
import { useGetTag } from "@/apis/question";
import MakeQuestion from "@/components/element/main/makeQuestionBox";
import PopularQuestionAndQuestionSet from "@/components/element/main/popularQuestionAndQuestionSet";
import QuestionOfTheDay from "@/components/element/main/questionOfTheDay";
import RandomQuestion from "@/components/element/main/randomQuestion";
import QuestionFinder from "@/components/organism/questionFinder";
import { useCategoryState, useTagState } from "@/store/questionState";
import { color } from "@/styles/theme";
import { categoryType } from "@/utils/Translation";
import search from "public/assets/svg/search.svg";
import React from "react";
import styled, { css } from "styled-components";
import { Stack } from "../../designSystem/common/stack";

/** @returns 메인 페이지 질문 components */
export default function Main() {
    return (
        <Container>
            <Stack direction="column" width="1100px" gap={30}>
                <MainImg>
                    면접 대비가 어렵다면?
                    <br />
                    InQ로 함께 공유하며 준비해요!
                </MainImg>
                <QuestionOfTheDay />
                <PopularQuestionAndQuestionSet />
                <RandomQuestion />
                <MakeQuestion />
                <Divider />
            </Stack>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 60px;
`;

const MainImg = styled.div`
    width: 1100px;
    height: 275px;
    background-image: url("/assets/svg/mainBackground.svg");
    border-radius: 20px;
    color: ${color.gray1};
    font-size: 40px;
    font-weight: 500;
    padding: 67px 92px;
`;

const Divider = styled.div`
    width: 1104px;
    height: 1px;
    background: ${color.gray4};
`;
