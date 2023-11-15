import React from "react";
import styled, { css } from "styled-components";
import { color } from "@/styles/theme";
import { useMyInfoSideBar } from "@/store/questionState";

/**
 * @returns sideBar components
 */
export function SideBar() {
    const { sideBarType, setSideBarType } = useMyInfoSideBar();
    const sideBarList = [
        {
            label: "내 정보",
            endPoint: "myInfo",
        },
        {
            label: "정보 수정",
            endPoint: "myInfoChange",
        },
        {
            label: "답변 내역",
            endPoint: "answerHistory",
        },
        {
            label: "등록한 질문",
            endPoint: "myQuestion",
        },
        {
            label: "등록한 질문 세트",
            endPoint: "mySet",
        },
        {
            label: "즐겨찾기한 질문",
            endPoint: "myFavoriteQuestion",
        },
        {
            label: "즐겨찾기한 질문 세트",
            endPoint: "myFavoriteSet",
        },
    ];

    return (
        <SideBarContainer>
            {sideBarList.map((v, i) => (
                <BtnWrapper
                    onClick={() => {
                        setSideBarType(v.endPoint);
                    }}
                    checked={sideBarType === v.endPoint}
                    key={i}
                >
                    {v.label}
                </BtnWrapper>
            ))}
        </SideBarContainer>
    );
}

const SideBarContainer = styled.div`
    width: 250px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const BtnWrapper = styled.button<{ checked: boolean }>`
    width: 100%;
    height: 60px;
    ${({ checked }) =>
        checked
            ? css`
                  background-color: ${color.primaryDefault};
                  border: none;
                  color: ${color.gray1};
              `
            : css`
                  border: 1px solid ${color.gray4};
                  color: ${color.gray5};
              `}
    border-radius: 50px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        background-color: ${color.primaryDefault};
        border: none;
        color: ${color.gray1};
    }
`;
