import { useGetTag } from "@/apis/question";
import { color } from "@/styles/theme";
import { categoryType } from "@/utils/Translation";
import React, { useState } from "react";
import styled from "styled-components";
import { Stack } from "../common/stack";

export const Category = () => {
    const [selectCategory, setSelectCategory] = useState<string>("랭킹");
    const [selectTag, setSelectTag] = useState<string[]>(["개발"]);
    const category = ["개발", "마케팅", "기획", "상식", "학습", "경력", "인성"];
    const categoryTag = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
    ];
    const { data } = useGetTag(categoryType[selectCategory]);

    return (
        <CategoryContainer>
            <CategoryBtn
                $isSelect={selectCategory === "랭킹"}
                onClick={() => {
                    setSelectCategory("랭킹");
                }}
            >
                랭킹
            </CategoryBtn>
            {category.map((categoryName, i) => (
                <Stack key={i} direction="column" gap={20}>
                    <CategoryBtn
                        $isSelect={selectCategory === categoryName}
                        onClick={() => {
                            setSelectCategory(categoryName);
                        }}
                    >
                        {categoryName}
                    </CategoryBtn>
                    {selectCategory === categoryName &&
                        !!data?.tag_list.length && (
                            <TagWrapper>
                                {data?.tag_list.map((tag, i) => (
                                    <TagBtn
                                        key={i}
                                        $isSelect={selectTag.includes(tag)}
                                    >
                                        # {tag}
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
        $isSelect ? "none" : `1px solid ${color.gray4}`};
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
    @keyframes slideInDown {
        0% {
            max-height: 0px;
        }
        100% {
            max-height: 1000px;
        }
    }
    animation: slideInDown 2s ease-out forwards;
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
