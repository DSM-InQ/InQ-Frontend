import React from 'react';
import styled from 'styled-components';
import { color } from '@/styles/theme';
import { UserInfoButton } from './userInfoButton';

/**
 * @returns sidebar components
 */
export function Sidebar() {
    const sidebarList = [
        {
            label: '내 정보',
            url: '/myInfo',
        },
        {
            label: '정보 수정',
            url: '/myInfoChange',
        },
        {
            label: '답변 내역',
            url: '/myAnswer',
        },
        {
            label: '등록한 질문',
            url: '/myQuestion',
        },
        {
            label: '등록한 질문 세트',
            url: '/mySet',
        },
    ];

    return (
        <SidebarContainer>
            {sidebarList.map((v, i) => (
                <UserInfoButton key={i} label={v.label} url={v.url} />
            ))}
        </SidebarContainer>
    );
}

const SidebarContainer = styled.div`
    width: 250px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;
