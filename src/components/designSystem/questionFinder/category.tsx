import { useGetTag } from "@/apis/question";
import { useCategoryState, useTagState } from "@/store/questionState";
import { color } from "@/styles/theme";
import { categoryType } from "@/utils/Translation";
import React from "react";
import styled, { css } from "styled-components";
import { Stack } from "../common/stack";

/** @returns 카테고리 및 태그 선택 components */
export const Category = () => {
    /** 선택한 카테고리 state */
    const { category, selectCategory } = useCategoryState();
    /** 선택한 태그 state */
    const { tag, selectTag, resetTag } = useTagState();
    /** 카테고리 종류 */
    const categoryArray = [
        "개발",
        "마케팅",
        "기획",
        "상식",
        "학습",
        "경력",
        "인성",
    ];

    /** 선택한 카테고리에 대한 태그 */
    const { data, isFetching } = useGetTag(categoryType[category]);
    return (
        <CategoryContainer>
            <CategoryBtn
                $isSelect={category === "랭킹"}
                onClick={() => {
                    selectCategory("랭킹");
                }}
            >
                랭킹
            </CategoryBtn>
            {categoryArray.map((categoryName, i) => (
                <Stack key={i} direction="column" gap={20}>
                    <CategoryBtn
                        $isSelect={category === categoryType[categoryName]}
                        onClick={() => {
                            selectCategory(categoryType[categoryName]);
                            resetTag();
                        }}
                    >
                        {categoryName}
                    </CategoryBtn>
                    {category === categoryName &&
                        !!data?.tag_list.length &&
                        !isFetching && (
                            <TagWrapper>
                                {data?.tag_list.map((tagName, i) => (
                                    <TagBtn
                                        key={i}
                                        $isSelect={tag.includes(tagName)}
                                        onClick={() => selectTag(tagName)}
                                    >
                                        # {tagName}
                                    </TagBtn>
                                ))}
                            </TagWrapper>
                        )}
                </Stack>
            ))}
        </CategoryContainer>
    );
};

const CategoryContainer = styled.div`
    width: 256px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const CategoryBtn = styled.button<{ $isSelect: boolean }>`
    width: 230px;
    height: 60px;
    border: ${({ $isSelect }) =>
        $isSelect ? "none" : css`1px solid ${color.gray4}`};
    border-radius: 50px;
    background-color: ${({ $isSelect }) =>
        $isSelect ? `${color.primaryDefault}` : `${color.gray1}`};
    font-size: 18px;
    font-weight: 600;
    color: ${({ $isSelect }) => ($isSelect ? `white` : `${color.gray5}`)};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 25px;
    cursor: ${({ $isSelect }) => ($isSelect ? "not-allowed" : "pointer")};
    &:hover {
        background-color: ${({ $isSelect }) =>
            $isSelect ? `${color.primaryDefault}` : `${color.gray2}`};
    }
`;

const TagWrapper = styled.div`
    width: 230px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-left: 15px;
    overflow: hidden;
`;

const TagBtn = styled.button<{ $isSelect: boolean }>`
    height: 26px;
    min-width: 50px;
    padding: 0px 10px;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 13px;
    background: ${({ $isSelect }) =>
        $isSelect ? `${color.primaryDefault}` : `${color.gray3}`};
    font-size: 13px;
    font-weight: 500;
    color: ${({ $isSelect }) => ($isSelect ? `white` : `${color.gray5}`)};
    cursor: pointer;
`;
