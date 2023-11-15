"use client";
import React from "react";
import { color } from "@/styles/theme";
import styled from "styled-components";
import { Stack } from "@/components/designSystem/common/stack";
import Image from "next/image";
import profile from "public/assets/svg/profile.svg";
import { useGetCheck, useGetMyInfo } from "@/apis/user";
import checkDate from "public/assets/svg/checkDate.svg";
import { Text } from "@/components/designSystem/common/text";
import { CheckDate } from "@/apis/user";

export const Info = () => {
    const {
        data: myInfoData,
        isLoading: myInfoIsLoading,
        isError: myInfoIsError,
    } = useGetMyInfo();
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

    const checkDataList = Object.values(
        checkData !== undefined ? checkData : firstData
    );
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    const checkList = checkDataList.map((v, i) => {
        return {
            day: days[i],
            status: v,
        };
    });

    /** 출석체크 api 호출 */
    const { mutate } = CheckDate();

    return (
        <Stack
            display="inline-flex"
            direction="column"
            align="flex-start"
            gap={30}
        >
            <Text size={22} weight={600} color={color.primaryDefault}>
                내 정보
            </Text>
            <MyInfoWrapper>
                <Stack gap={30}>
                    <Profile src={profile} alt="" />
                    <Stack>
                        {myInfoIsLoading && <div>로딩 중...</div>}
                        {myInfoIsError && <div>오류</div>}
                        {myInfoData && (
                            <Stack direction="column">
                                <Text
                                    size={22}
                                    weight={600}
                                    color={color.gray10}
                                >
                                    {myInfoData.username}
                                </Text>
                                <Text
                                    margin="3px 0 0 0"
                                    size={18}
                                >{`가입일: ${myInfoData.join_date}`}</Text>
                                <Text
                                    size={18}
                                    margin="10px 0"
                                >{`${myInfoData.coin} 코인`}</Text>
                                <Text
                                    size={18}
                                >{`${myInfoData.job} ${myInfoData.job_duration}년차`}</Text>
                            </Stack>
                        )}
                    </Stack>
                </Stack>
                <Stack direction="column" gap={10}>
                    <Text margin="3px 0 10px 0" size={18}>
                        출석체크
                    </Text>
                    <Stack gap={40} margin="0 0 0 20px">
                        {checkList.map((v, i) => (
                            <Stack
                                key={i}
                                display="inline-flex"
                                direction="column"
                                justify="center"
                            >
                                <button onClick={() => mutate()}>
                                    <Check
                                        src={checkDate}
                                        alt=""
                                        v={v.status}
                                    />
                                </button>
                                <DayWrapper>{v.day}</DayWrapper>
                            </Stack>
                        ))}
                    </Stack>
                </Stack>
            </MyInfoWrapper>
        </Stack>
    );
};

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

const Check = styled(Image)<{ v: boolean }>`
    filter: ${(props) => (props.v ? "grayscale(0)" : "grayscale(100)")};
`;

const DayWrapper = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: center;
    font-size: 18px;
    font-weight: 400;
`;
