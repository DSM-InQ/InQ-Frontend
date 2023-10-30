"use client";
import React, { useEffect, useState } from "react";
import { Category } from "@/components/designSystem/questionFinder/category";
import { QuestionBox } from "@/components/designSystem/questionFinder/questionBox";
import styled from "styled-components";
import { Stack } from "@/components/designSystem/common/stack";
import { color } from "@/styles/theme";
import Image from "next/image";
import search from "public/assets/svg/search.svg";
import sort from "public/assets/svg/sort.svg";
import { DropDown } from "@/components/designSystem/common/dropDown";
import {
    useGetQuestionList,
    useGetQuestionRank,
    useGetQuestionSetList,
    useGetQuestionSetRank,
} from "@/apis/question";
import { questionResponse, questionSetResponse } from "@/apis/question/type";
import { useCategoryState, useTagState } from "@/store/questionState";
import { useInput } from "@/hooks/useInput";
import { useDidMountEffect } from "@/hooks/useDidMountEffect";

/** @returns 질문 검색 page */
export default function QuestionFinder() {
    /** 페이징을 위한 state */
    const [page, setPage] = useState<number>(1);
    /** 질문을 오름차순 / 내림차순으로 정렬할지 구분하는 state */
    const [sortType, setSortType] = useState<boolean>(true);
    /** 선택한 카테고리 state */
    const { category } = useCategoryState();
    /** 선택한 태그 state */
    const { tag } = useTagState();
    /** 질문인지 질문세트인지 구분하는 state */
    const [questionType, setQuestionType] = useState<string>("질문");
    /** 질문 / 질문세트 총 data */
    const [question, setQuestion] = useState<questionResponse>({
        has_next: false,
        question_list: [],
    });
    /** 키워드 input의 state */
    const { form, handleChange } = useInput("");

    /** 질문 랭킹 목록 */
    const { refetch: questionRankingRefetch } = useGetQuestionRank(page);
    /** 질문 랭킹 목록 */
    const { refetch: questionSetRankingRefetch } = useGetQuestionSetRank(page);
    /** 질문 목록 */
    const { refetch: questionListRefetch } = useGetQuestionList(
        page,
        category,
        tag,
        form
    );
    /** 질문세트 목록 */
    const { refetch: questionSetListRefetch } = useGetQuestionSetList(
        page,
        category,
        tag,
        form
    );

    /** 값을 더해줄 때 */
    const addQuestion = (item: questionResponse | questionSetResponse) => {
        questionType === "질문"
            ? item &&
              setQuestion((prev) => ({
                  has_next: item.has_next,
                  question_list: [
                      ...prev.question_list,
                      ...(item as questionResponse).question_list,
                  ],
              }))
            : item &&
              setQuestion((prev) => ({
                  has_next: item.has_next,
                  question_list: [
                      ...prev.question_list,
                      ...(item as questionSetResponse).question_sets_list,
                  ],
              }));
    };

    /** 값이 refetch 됐을 때 */
    const refetchQuestion = (item: questionResponse | questionSetResponse) => {
        questionType === "질문"
            ? item &&
              setQuestion({
                  has_next: item.has_next,
                  question_list: (item as questionResponse).question_list,
              })
            : item &&
              setQuestion({
                  has_next: item.has_next,
                  question_list: (item as questionSetResponse)
                      .question_sets_list,
              });
    };

    /** 현재 상태에 따라 새로 값 세팅 */
    const saveQuestion = async (isAdd: boolean = false) => {
        if (questionType === "질문") {
            if (category === "랭킹") {
                const newQuestionRanking = await questionRankingRefetch();
                isAdd
                    ? addQuestion(newQuestionRanking.data!)
                    : refetchQuestion(newQuestionRanking.data!);
            } else {
                const newQuestionList = await questionListRefetch();
                isAdd
                    ? addQuestion(newQuestionList.data!)
                    : refetchQuestion(newQuestionList.data!);
            }
        } else {
            if (category === "랭킹") {
                const newQuestionSetRanking = await questionSetRankingRefetch();
                isAdd
                    ? addQuestion(newQuestionSetRanking.data!)
                    : refetchQuestion(newQuestionSetRanking.data!);
            } else {
                const newQuestionSetList = await questionSetListRefetch();
                isAdd
                    ? addQuestion(newQuestionSetList.data!)
                    : refetchQuestion(newQuestionSetList.data!);
            }
        }
    };

    /** 질문/질문세트 검색 */
    useEffect(() => {
        setQuestion({ has_next: false, question_list: [] });
        setTimeout(saveQuestion);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionType, category, tag]);

    /** 디바운스 구현 */
    useDidMountEffect(() => {
        const debounce = setTimeout(() => {
            return saveQuestion();
        }, 500);
        return () => clearTimeout(debounce);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);
    return (
        <Container>
            <Category />
            <Stack direction="column" align="center" gap={40}>
                <Stack width="790px" justify="end" gap={16}>
                    <InputWrapper>
                        <SearchInput
                            value={form}
                            onChange={handleChange}
                            disabled={category === "랭킹"}
                        />
                        <SearchImage src={search} alt="" />
                    </InputWrapper>
                    <DropDown
                        width="135px"
                        onChange={(type) => {
                            setQuestionType(type);
                        }}
                        option={["질문", "질문세트"]}
                        value={questionType}
                    />
                    <SortBtn onClick={() => setSortType((prev) => !prev)}>
                        <SortImg src={sort} alt="" $sortType={sortType} />
                        {sortType ? "최신순" : "오래된순"}
                    </SortBtn>
                </Stack>
                {question.question_list
                    ?.sort(
                        (a, b) =>
                            new Date(
                                sortType ? a.created_at : b.created_at
                            ).getTime() -
                            new Date(
                                sortType ? b.created_at : a.created_at
                            ).getTime()
                    )
                    .map((item, i) => {
                        return <QuestionBox key={i} data={item} />;
                    })}
                {question.has_next && (
                    <AddQuestion
                        onClick={() => {
                            setPage((prev) => ++prev);
                            setTimeout(() => saveQuestion(true));
                        }}
                    >
                        더보기 +
                    </AddQuestion>
                )}
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

const InputWrapper = styled.label`
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
    &:disabled {
        background-color: ${color.gray3};
        cursor: not-allowed;
    }
`;

const SearchImage = styled(Image)`
    position: absolute;
    left: 14px;
    top: 9px;
`;

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
