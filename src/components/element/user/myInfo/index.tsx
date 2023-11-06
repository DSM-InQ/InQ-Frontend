'use client';
import React from 'react';
import { color } from '@/styles/theme';
import styled from 'styled-components';
import { Sidebar } from '@/components/designSystem/user/sidebar';
import { Stack } from '@/components/designSystem/common/stack';
import Image from 'next/image';
import profile from 'public/assets/svg/profile.svg';
import { useGetMyInfo } from '@/apis/user';
import DateCheck from '@/components/designSystem/user/dateCheck';

/** @returns 유저정보 조회 page */
export default function MyInfoCompo() {
    const { data, isLoading, isError } = useGetMyInfo();

    const date = [
        {
            check: true,
            day: '월',
        },
        {
            check: true,
            day: '화',
        },
        {
            check: true,
            day: '수',
        },
        {
            check: true,
            day: '목',
        },
        {
            check: true,
            day: '금',
        },
        {
            check: true,
            day: '토',
        },
        {
            check: false,
            day: '일',
        },
    ];

    return (
        <Container>
            <Wrapper>
                <Sidebar />

                <ContentWrapper>
                    <Title>내 정보</Title>
                    <MyInfoWrapper>
                        <Stack gap={30}>
                            <Profile src={profile} alt="" />

                            <Stack>
                                {isLoading && <div>로딩 중...</div>}
                                {isError && <div>오류</div>}
                                {data && (
                                    <Stack direction="column">
                                        <Title style={{ color: `${color.gray10}` }}>{data.username}</Title>
                                        <Text>{`가입일: ${data.join_date}`}</Text>
                                        <Text>{`${data.coin} 코인`}</Text>
                                        <Text>{`${data.job} ${data.job_duration}년차`}</Text>
                                    </Stack>
                                )}
                            </Stack>
                        </Stack>

                        <Stack direction="column" gap={10}>
                            <Text>출석체크</Text>

                            <Stack gap={15}>
                                {date.map((v, i) => (
                                    // <DateCheck key={i} check={v.check} day={v.day} />
                                    <DateCheck key={i} day={v.day} />
                                ))}
                            </Stack>
                        </Stack>
                    </MyInfoWrapper>
                </ContentWrapper>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.div`
    padding: 100px 0 100px 0;
    display: flex;
    gap: 40px;
`;

const ContentWrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
`;
const Title = styled.div`
    font-size: 22px;
    font-weight: 600;
    color: ${color.primaryDefault};
`;
const MyInfoWrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
    padding: 80px;
    width: 100%;
    height: 500px;
    border: 1px solid ${color.gray4};
    border-radius: 8px;
    gap: 30px;
`;

const Profile = styled(Image)`
    width: 100px;
    height: 100px;
`;

const Text = styled.div`
    font-size: 18px;
    font-weight: 400;
`;
