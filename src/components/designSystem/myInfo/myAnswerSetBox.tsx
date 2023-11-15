import React, { useState } from "react";
import styled from "styled-components";
import viewImg from "public/assets/svg/viewImg.svg";
import { color } from "@/styles/theme";
import { solvedQuestionListType } from "@/apis/user/type";
import { Stack } from "../common/stack";
import { Text } from "@/components/designSystem/common/text";
import Image from "next/image";
import { MyAnswerBox } from "./myAnswerBox";

interface propsType {
    data: solvedQuestionListType;
}

/**
 * @param data 답변한 질문 세트 객체
 * @returns 답변한 질문 세트 박스 components
 */
export const MyAnswerSetBox = ({ data }: propsType) => {
    const [view, setView] = useState(false);
    return (
        <Container>
            <Stack justify="space-between" align="center">
                <CategoryText>질문 세트</CategoryText>
                <Stack gap={6} align="center">
                    <DateText>
                        {data?.solved_at.slice(0, 10)}{" "}
                        {data?.solved_at.slice(11, 16)}
                    </DateText>
                </Stack>
            </Stack>
            <Stack gap={8} align="center">
                <Text size={20}>{data?.question_set_name}</Text>
            </Stack>
            <Stack>
                <ViewBtn onClick={() => setView((prev) => !prev)}>
                    {view ? "접기" : "더보기"}
                    <Image
                        src={viewImg}
                        alt=""
                        width="10"
                        height="10"
                        style={{
                            marginLeft: "10px",
                            rotate: view ? "0deg" : "90deg",
                            transition: "0.45s",
                        }}
                    />
                </ViewBtn>
            </Stack>
            {view &&
                data?.question_list.map((item) => {
                    return <MyAnswerBox key={item.question_id} data={item} />;
                })}
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

const ViewBtn = styled.button`
    color: #555;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
`;
