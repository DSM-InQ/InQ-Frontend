"use client";
import React, { useEffect, useState } from "react";
import { QuestionBox } from "@/components/designSystem/questionFinder/questionBox";
import styled, { css } from "styled-components";
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
import {
    useCategoryState,
    useFilter,
    useTagState,
} from "@/store/questionState";
import { useDebounce } from "@/utils/useDebounce";

/** @returns 질문 목록 및 검색 components */
export default function QuestionList() {
    /** 키워드 검색, 질문/질문세트 검색, 정렬을 관리하는 state */
    const { filter, setForm, setType } = useFilter();
    /** 선택한 카테고리 state */
    const { category } = useCategoryState();
    /** 선택한 태그 state */
    const { tag } = useTagState();

    /** 질문 랭킹 목록 */
    const {
        data: questionRanking,
        fetchNextPage: questionRankingFetchNextPage,
        refetch: questionRankingRefetch,
        isFetching: questionRankingIsFetching,
    } = useGetQuestionRank();
    /** 질문 랭킹 목록 */
    const {
        data: questionSetRanking,
        fetchNextPage: questionSetRankingFetchNextPage,
        refetch: questionSetRankingRefetch,
        isFetching: questionSetRankingIsFetching,
    } = useGetQuestionSetRank();
    /** 질문 목록 */
    const {
        data: questionList,
        fetchNextPage: questionListFetchNextPage,
        refetch: questionListRefetch,
    } = useGetQuestionList(category, tag, filter.keyword);
    /** 질문세트 목록 */
    const {
        data: questionSetList,
        fetchNextPage: questionSetListFetchNextPage,
        refetch: questionSetListRefetch,
    } = useGetQuestionSetList(category, tag, filter.keyword);

    /** 현재 상태에 따라 새로 값 세팅 */
    const saveQuestion = async (isAdd = false) => {
        if (filter.questionType === "질문") {
            if (category === "랭킹") {
                isAdd
                    ? questionRankingFetchNextPage()
                    : questionRankingRefetch();
            } else {
                isAdd ? questionListFetchNextPage() : questionListRefetch();
            }
        } else {
            if (category === "랭킹") {
                isAdd
                    ? questionSetRankingFetchNextPage()
                    : questionSetRankingRefetch();
            } else {
                isAdd
                    ? questionSetListFetchNextPage()
                    : questionSetListRefetch();
            }
        }
    };

    /** 현재 상태에 따라 새로 값 세팅 */
    const questionOrQuestionSetData = () => {
        if (filter.questionType === "질문") {
            if (category === "랭킹") {
                return questionRanking?.pages.flatMap(
                    (prev) => prev.question_list
                );
            } else {
                return questionList?.pages
                    .flatMap((prev) => prev.question_list)
                    .sort(
                        (a, b) =>
                            new Date(
                                filter.sortType ? b.created_at : a.created_at
                            ).getTime() -
                            new Date(
                                filter.sortType ? a.created_at : b.created_at
                            ).getTime()
                    );
            }
        } else {
            if (category === "랭킹") {
                return questionSetRanking?.pages.flatMap(
                    (prev) => prev.question_sets_list
                );
            } else {
                return questionSetList?.pages
                    .flatMap((prev) => prev.question_sets_list)
                    .sort(
                        (a, b) =>
                            new Date(
                                filter.sortType ? b.created_at : a.created_at
                            ).getTime() -
                            new Date(
                                filter.sortType ? a.created_at : b.created_at
                            ).getTime()
                    );
            }
        }
    };

    /** 다음 페이지가 있는지 확인 */
    const questionOrQuestionNextPage = () => {
        if (filter.questionType === "질문") {
            if (category === "랭킹") {
                return questionRanking?.pages.at(-1)?.has_next!;
            } else {
                return questionList?.pages.at(-1)?.has_next!;
            }
        } else {
            if (category === "랭킹") {
                return questionSetRanking?.pages.at(-1)?.has_next!;
            } else {
                return questionSetList?.pages.at(-1)?.has_next!;
            }
        }
    };

    /** 질문/질문세트 검색 */
    useEffect(() => {
        setTimeout(saveQuestion);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, tag, filter.questionType]);

    /** 디바운스 구현 */
    const debouncedSearchTerm = useDebounce(filter.keyword, 500);
    /** 디바운스 구현 */
    useEffect(() => {
        if (debouncedSearchTerm) {
            saveQuestion();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm]);

    return (
        <Stack direction="column" align="center" gap={40}>
            <>
                <Stack width="790px" justify="end" gap={16}>
                    <InputWrapper>
                        <SearchInput
                            value={filter.keyword}
                            name="keyword"
                            onChange={setForm}
                            disabled={category === "랭킹"}
                        />
                        <SearchImage src={search} alt="" />
                    </InputWrapper>
                    <DropDown
                        width="135px"
                        onChange={(type) => {
                            setType("questionType", type);
                        }}
                        option={["질문", "질문세트"]}
                        value={filter.questionType}
                    />
                    <SortBtn
                        onClick={() => setType("sortType", !filter.sortType)}
                        disabled={category === "랭킹"}
                    >
                        <SortImg
                            src={sort}
                            alt=""
                            $sortType={filter.sortType}
                            disabled={category === "랭킹"}
                        />
                        {filter.sortType ? "최신순" : "오래된순"}
                    </SortBtn>
                </Stack>
                {questionOrQuestionSetData()?.map((item, i) => {
                    return (
                        item !== undefined && (
                            <QuestionBox key={i} data={item} />
                        )
                    );
                })}
                {!questionRankingIsFetching &&
                    !questionSetRankingIsFetching &&
                    questionOrQuestionNextPage() && (
                        <AddQuestion
                            onClick={() => {
                                saveQuestion(true);
                            }}
                        >
                            더보기 +
                        </AddQuestion>
                    )}
            </>
        </Stack>
    );
}

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
    &:disabled {
        background: ${color.gray3};
        cursor: not-allowed;
    }
`;

const SortImg = styled(Image)<{ $sortType: boolean; disabled: boolean }>`
    ${({ disabled }) =>
        disabled &&
        css`
            opacity: 0.3;
        `}
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
