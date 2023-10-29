"use client";
import React from "react";
import styled from "styled-components";
import thumbsUp from "public/assets/svg/thumbsUp.svg";
import star from "public/assets/svg/star.svg";
import user from "public/assets/svg/user.svg";
import Image from "next/image";
import { color } from "@/styles/theme";
import { Stack } from "../common/stack";
import { questionListType } from "@/apis/question/type";
import { getValueByKey } from "@/utils/useGetPropertyKey";
import { categoryType } from "@/utils/Translation";
import { useRouter } from "next/navigation";

interface propsType {
    data: questionListType;
}

/**
 * @param data 질문 / 질문세트 객체
 * @returns 질문 박스 components
 */
export const QuestionBox = ({ data }: propsType) => {
    const router = useRouter();
    return (
        <Container
            onClick={() => {
                !!data.question_set_name &&
                    router.push(String(data.question_set_id));
            }}
        >
            <Stack justify="space-between" align="center">
                <CategoryText>{`질문 : ${getValueByKey(
                    categoryType,
                    data.category
                )}`}</CategoryText>
                <Stack gap={6}>
                    <DateText>
                        {data.created_at.slice(0, 10)}{" "}
                        {data.created_at.slice(11, 16)}
                    </DateText>
                    {data.like_count !== undefined && (
                        <>
                            <Image src={thumbsUp} alt="" />
                            <NumText>{data.like_count}</NumText>
                        </>
                    )}
                    {data.view_count !== undefined && (
                        <>
                            <Image src={user} alt="" />
                            <NumText>{data.view_count}</NumText>
                        </>
                    )}
                </Stack>
            </Stack>
            <Stack gap={8} align="center">
                <TitleText>
                    {data.question ? data.question : data.question_set_name}
                </TitleText>
                {data.is_favorite && <Image src={star} alt="" />}
            </Stack>
            <Stack justify="space-between">
                <UserText>{`${data.username} · ${data.job} ${data.job_duration}년차`}</UserText>
                <Stack gap={4} margin={"0 -4px 0 0"}>
                    {data.tags.map((item, i) => (
                        <Tag key={i}># {item}</Tag>
                    ))}
                </Stack>
            </Stack>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 790px;
    height: 148px;
    gap: 12px;
    border-radius: 8px;
    border: 1px solid ${color.gray4};
    background: ${color.gray1};
    padding: 0 38px;
    cursor: pointer;
    &:hover {
        background-color: ${color.gray2};
    }
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

const NumText = styled.div`
    font-size: 13px;
    font-weight: 500;
`;

const TitleText = styled.div`
    font-size: 20px;
    font-weight: 400;
`;

const UserText = styled.div`
    font-size: 18px;
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