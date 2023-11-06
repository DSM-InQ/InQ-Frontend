import { color } from "@/styles/theme";
import backImg from "public/assets/svg/backImg.svg";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Text } from "@/components/designSystem/common/text";
import { questionListType } from "@/apis/question/type";

interface propsType {
    data: questionListType;
}

/** @returns 인기 질문 components */
export default function PopularQuestionBox({ data }: propsType) {
    return (
        <Container>
            <Text size={18} color={color.gray6}>
                {data?.question}
            </Text>
            <QuoteImg src={backImg} alt="" style={{ rotate: "180deg" }} />
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    width: 542px;
    height: 65px;
    border-radius: 8px;
    border: 1px solid ${color.gray4};
    background-color: ${color.gray1};
    display: flex;
    align-items: center;
    padding: 0 33px 3px 33px;
`;

const QuoteImg = styled(Image)`
    position: absolute;
    top: 22px;
    right: 22px;
`;
