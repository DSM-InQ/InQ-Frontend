"use client";
import React, { useState } from 'react';
import styled from 'styled-components';
import { color } from '../../../styles/theme';
import { useRouter } from 'next/navigation';

/**
 * @returns sideBar components
 */
export function SideBar() {
    const [mouseOver, setMouseOver] = useState(false);
    const router = useRouter();
    const sideBarList = [
        {
            label: '내 정보',
            endPoint: '/myInfo',
        },
        {
            label: '정보 수정',
            endPoint: '/myInfoChange',
        },
        {
            label: '답변 내역',
            endPoint: '???',
        },
        {
            label: '등록한 질문',
            endPoint: '???',
        },
        {
            label: '등록한 질문 세트',
            endPoint: '???',
        },
        {
            label: '즐겨찾기한 질문',
            endPoint: '???',
        },
        {
            label: '즐겨찾기한 질문 세트',
            endPoint: '???',
        },
    ];

    return (
        <SideBarContainer>
            {sideBarList.map((v, i) => (
                <BtnWrapper
                    onMouseOver={() => {
                        if (mouseOver) setMouseOver(false);
                        else setMouseOver(true);
                    }}
                    onClick={() => {
                        router.push(v.endPoint);
                    }}
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

const BtnWrapper = styled.button`
    width: 100%;
    height: 60px;
    border: 1px solid ${color.gray4};
    border-radius: 50px;

    font-size: 18px;
    font-weight: 600;
    color: ${color.gray5};

    &:hover {
        background-color: ${color.primaryDefault};
        border: none;
        color: ${color.gray1};
    }
`;
