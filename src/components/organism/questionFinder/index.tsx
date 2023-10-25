"use client";
import React from "react";
import { Category } from "@/components/designSystem/questionFinder/category";
import { QuestionBox } from "@/components/designSystem/questionFinder/questionBox";
import styled from "styled-components";
import { Stack } from "@/components/designSystem/common/stack";
import { color } from "@/styles/theme";
import Image from "next/image";
import search from "public/assets/svg/search.svg";
import sort from "public/assets/svg/sort.svg";
import { DropDown } from "@/components/designSystem/common/dropDown";
import { useGetQuestionRank } from "@/apis/question";

export default function QuestionFinder() {
    const { data } = useGetQuestionRank(1);
    return (
        <Container>
            <Category />
            <Stack direction="column" align="center" gap={40}>
                <Stack width="790px" justify="end" gap={16}>
                    <InputWrapper>
                        <SearchInput />
                        <SearchImage src={search} alt="" />
                    </InputWrapper>
                    <DropDown
                        width="135px"
                        onChange={(type) => {}}
                        option={["질문", "질문세트"]}
                        value={""}
                    />
                    <SortBtn>
                        <Image src={sort} alt="" />
                        최신순
                    </SortBtn>
                </Stack>
                {data?.question_list.map((item, i) => {
                    return <QuestionBox key={item.question_id} data={item}/>;
                })}
                {data?.has_next && <AddQuestion>더보기 +</AddQuestion>}
            </Stack>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    gap: 59px;
`;

const InputWrapper = styled.div`
    position: relative;
`;

const SearchInput = styled.input`
    width: 241px;
    height: 47px;
    border-radius: 30px;
    border: 1px solid ${color.gray4};
    background: ${color.gray1};
    padding: 0 20px 0 63px;
    font-size: 15px;
`;

const SearchImage = styled(Image)`
    position: absolute;
    left: 14px;
    top: 9px;
`;

const SortBtn = styled.button`
    width: 99px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid ${color.gray4};
    background: ${color.gray1};
    font-size: 14px;
    font-weight: 700;
    gap: 10px;
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
