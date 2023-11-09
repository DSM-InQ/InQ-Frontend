'use client';
import React, { useEffect } from 'react';
import { color } from '@/styles/theme';
import styled from 'styled-components';
import { Stack } from '@/components/designSystem/common/stack';
import Image from 'next/image';
import profile from 'public/assets/svg/profile.svg';
import { useGetCheck, useGetMyInfo } from '@/apis/user';
import { SideBar } from '@/components/designSystem/user/sideBar';
import checkDate from 'public/assets/svg/checkDate.svg';
import { CheckDate } from '@/apis/user/myInfo';

/** @returns 유저정보 조회 page */
export default function MyInfoCompo() {
    const { data: myInfoData, isLoading: myInfoIsLoading, isError: myInfoIsError } = useGetMyInfo();
    const { data: checkData } = useGetCheck();

    const firstData = {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    };

    const checkDataList = Object.values(checkData !== undefined ? checkData : firstData);
    const days = ['월', '화', '수', '목', '금', '토', '일'];
    const checkList = checkDataList.map((v, i) => {
        return {
            day: days[i],
            status: v,
        };
    });

    /** 출석체크 api 호출 */
    const { mutate } = CheckDate();

    return (
        <Container>
            <Wrapper>
                <SideBar />

                <ContentWrapper>
                    <Title>내 정보</Title>
                    <MyInfoWrapper>
                        <Stack gap={30}>
                            <Profile src={profile} alt="" />

                            <Stack>
                                {myInfoIsLoading && <div>로딩 중...</div>}
                                {myInfoIsError && <div>오류</div>}
                                {myInfoData && (
                                    <Stack direction="column">
                                        <Title style={{ color: `${color.gray10}` }}>{myInfoData.username}</Title>
                                        <Text>{`가입일: ${myInfoData.join_date}`}</Text>
                                        <Text>{`${myInfoData.coin} 코인`}</Text>
                                        <Text>{`${myInfoData.job} ${myInfoData.job_duration}년차`}</Text>
                                    </Stack>
                                )}
                            </Stack>
                        </Stack>

                        <Stack direction="column" gap={10}>
                            <Text>출석체크</Text>
                            <Stack gap={40}>
                                {checkList.map((v, i) => (
                                    <CheckWrapper key={i}>
                                        <button
                                            onClick={() => mutate()}
                                        >
                                            <Check v={v.status} src={checkDate} alt="" />
                                        </button>
                                        <DayWrapper>{v.day}</DayWrapper>
                                    </CheckWrapper>
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

const CheckWrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
`;

const Check = styled(Image)<{
    v: boolean;
}>`
    filter: ${(props) => (props.v ? 'grayscale(0)' : 'grayscale(100)')};
`;

const DayWrapper = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: center;
    font-size: 18px;
    font-weight: 400;
`;
