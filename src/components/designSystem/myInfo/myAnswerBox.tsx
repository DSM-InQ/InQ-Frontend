import React from "react";
import styled from "styled-components";
import { color } from "@/styles/theme";
import { Stack } from "../common/stack";
import { getValueByKey } from "@/utils/useGetPropertyKey";
import { categoryType } from "@/utils/Translation";
import { Text } from "@/components/designSystem/common/text";
import { solvedQuestionType } from "@/apis/user/type";

interface propsType {
    data: solvedQuestionType;
}

/**
 * @param data 답변한 질문 객체
 * @returns 답변한 질문 박스 components
 */
export const MyAnswerBox = ({ data }: propsType) => {
    return (
        <Container>
            <Stack justify="space-between" align="center">
                <CategoryText>
                    {getValueByKey(categoryType, data?.category)}
                </CategoryText>
                <Stack gap={6} align="center">
                    <DateText>
                        {data?.solved_at.slice(0, 10)}{" "}
                        {data?.solved_at.slice(11, 16)}
                    </DateText>
                </Stack>
            </Stack>
            <Stack gap={8} justify="space-between" align="center">
                <TitleText>{data?.question}</TitleText>
            </Stack>
            <Text
                size={18}
                color={color.gray6}
                style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    wordBreak: "break-all",
                }}
            >
                {data?.answer}
            </Text>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    gap: 12px;
    border-radius: 8px;
    border: 1px solid ${color.gray4};
    background: ${color.gray1};
    padding: 38px;
    cursor: pointer;
`;

const CategoryText = styled.div`
    color: ${color.primaryDefault};
    font-size: 18px;
    font-weight: 400;
    margin-top: -6px;
`;

const DateText = styled.div`
    color: ${color.gray5};
    font-size: 13px;
    font-weight: 500;
    margin: 2px 4px 0 0;
`;

const TitleText = styled.div`
    font-size: 20px;
    font-weight: 400;
`;

const Tag = styled.div`
    display: flex;
    height: 26px;
    padding: 0px 10px;
    justify-content: center;
    align-items: center;
    border-radius: 13px;
    background: ${color.gray2};
    color: ${color.gray6};
    font-size: 13px;
    font-weight: 400;
`;
