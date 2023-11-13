'use client';
import React from 'react';
import { color } from '@/styles/theme';
import styled from 'styled-components';
import { Stack } from '@/components/designSystem/common/stack';
import { useForm } from '@/hooks/useForm';
import { MyInfoChange } from '@/apis/user/myInfoChange';
import { Input } from '@/components/designSystem/common/input';
import Button from '@/components/designSystem/common/button';
import { SideBar } from '@/components/element/user/sideBar';

/** @returns 유저정보 수정 page */
export default function MyInfoChangeCompo() {
    /** 유저정보 data */
    const { form: signForm, handleChange: signFormChange } = useForm({
        username: '',
        job: '',
        job_duration: 0,
    });
    /** 유저정보 data를 구조분해할당 해놓은 부분 */
    const { username, job, job_duration } = signForm;

    /** 유저정보 수정 api 호출 */
    const { mutate } = MyInfoChange(signForm);

    return (
        <Container>
            <Wrapper>
                <SideBar />

                <ContentWrapper>
                    <Title>정보 수정</Title>
                    <MyInfoWrapper>
                        <Stack direction="column" gap={30} width="500px">
                            <Input label="이름" name="username" value={username} onChange={signFormChange} />

                            <Input label="직업" name="job" value={job} onChange={signFormChange} />

                            <Input label="경력" name="job_duration" value={job_duration} onChange={signFormChange} />
                        </Stack>

                        <Button onClick={() => mutate()} width="100px">
                            정보 수정
                        </Button>
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
    display: flex;
    padding: 80px;
    width: 100%;
    height: 500px;
    border: 1px solid ${color.gray4};
    border-radius: 8px;
    gap: 100px;
`;
