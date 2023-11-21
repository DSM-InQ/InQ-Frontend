"use client";
import { color } from "@/styles/theme";
import quote from "public/assets/svg/quote.svg";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Text } from "@/components/designSystem/common/text";
import { useGetQuestionOfToday } from "@/apis/question";

/** @returns 오늘의 면접 질문 components */
export default function QuestionOfToday() {
    const { data } = useGetQuestionOfToday();
    return (
        <Container>
            <Text size={18} color={color.gray6}>
                오늘의 면접 질문
            </Text>
            <Box>
                <QuoteImg src={quote} alt="" />
                <Text size={24}>{data?.question}</Text>
                <QuoteImg src={quote} alt="" style={{ rotate: "180deg" }} />
            </Box>
        </Container>
    );
}

const Container = styled.div`
    width: 1100px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Box = styled.div`
    width: 1100px;
    height: 148px;
    border-radius: 8px;
    border: 1px solid ${color.gray4};
    background-color: ${color.gray1};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 9px;
`;

const QuoteImg = styled(Image)`
    margin-top: -15px;
`;
