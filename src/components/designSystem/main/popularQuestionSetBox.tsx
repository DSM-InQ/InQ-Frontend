import { color } from "@/styles/theme";
import popularQuestionSetImg1 from "public/assets/svg/popularQuestionSetImg1.svg";
import popularQuestionSetImg2 from "public/assets/svg/popularQuestionSetImg2.svg";
import thumbs from "public/assets/svg/thumbs.svg";
import user from "public/assets/svg/user.svg";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Text } from "@/components/designSystem/common/text";
import { questionListType } from "@/apis/question/type";
import { Stack } from "../common/stack";

interface propsType {
    data: questionListType;
    index: number;
}

/** @returns 인기 질문 components */
export default function PopularQuestionSetBox({ data, index }: propsType) {
    return (
        <Container>
            <Text size={20}>{data?.question_set_name}sadfasdfa</Text>
            <Text size={13} margin="7px 0 0 0">
                {`${data?.username} · ${data?.job} ${data?.job_duration}년차`}
            </Text>
            <Stack gap={17} margin="20px 0 0 0">
                <Stack gap={6}>
                    <Image src={thumbs} alt="" />
                    <Text>{data?.like_count}</Text>
                </Stack>
                <Stack gap={6}>
                    <Image src={user} alt="" />
                    <Text>{data?.view_count}</Text>
                </Stack>
            </Stack>
            <QuoteImg
                src={
                    index === 0
                        ? popularQuestionSetImg1
                        : popularQuestionSetImg2
                }
                alt=""
            />
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    width: 542px;
    height: 151px;
    border-radius: 8px;
    border: 1px solid ${color.gray4};
    background-color: ${color.gray1};
    display: flex;
    flex-direction: column;
    padding: 29px 0 0 27px;
    overflow: hidden;
`;

const QuoteImg = styled(Image)`
    position: absolute;
    top: 0px;
    right: 0px;
`;
