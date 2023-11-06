'use client';
import React, { useState } from 'react';
import { useForm } from '@/hooks/useForm';
import { color } from '@/styles/theme';
import styled from 'styled-components';
import { Input } from '@/components/designSystem/common/input';
import { Stack } from '@/components/designSystem/common/stack';
import Button from '@/components/designSystem/common/button';
import { Signup } from '@/apis/signup';
import closeEye from 'public/assets/svg/closeEye.svg';
import openEye from 'public/assets/svg/openEye.svg';

/** @returns 회원가입 page */
export default function SignupCompo() {
    /** 비밀번호, 비밀번호 확인 input type 구분을 위한 state */
    const [isPassword, setIsPassword] = useState(true);
    const [isPassword2, setIsPassword2] = useState(true);
    /** 회원가입 data */
    const { form: signForm, handleChange: signFormChange } = useForm({
        account_id: '',
        username: '',
        password: '',
        password2: '',
        job: '',
        job_duration: 0,
    });
    /** 회원가입 data를 구조분해할당 해놓은 부분 */
    const { account_id, username, password, password2, job, job_duration } = signForm;

    /** 회원가입 api 호출 */
    const { mutate } = Signup(signForm);

    return (
        <Container>
            <Wrapper>
                <Header>
                    <Title>회원가입</Title>
                    <Description>
                        <Highlight>In</Highlight>terview
                        <Stack margin="0 5px 0 5px">+</Stack>
                        <Highlight>Q</Highlight>uestion
                    </Description>
                </Header>

                <InputWrapper>
                    <Input label="아이디" name="account_id" value={account_id} onChange={signFormChange} />

                    <Input label="이름" name="username" value={username} onChange={signFormChange} />

                    <Stack direction="column" width={'100%'}>
                        <Input
                            label="비밀번호"
                            name="password"
                            value={password}
                            type={isPassword ? 'password' : 'text'}
                            onChange={signFormChange}
                            icon={isPassword ? closeEye : openEye}
                            iconClick={() => setIsPassword((password) => !password)}
                        />

                        <Input
                            label="비밀번호 확인"
                            name="password2"
                            value={password2}
                            type={isPassword2 ? 'password' : 'text'}
                            onChange={signFormChange}
                            icon={isPassword2 ? closeEye : openEye}
                            iconClick={() => setIsPassword2((password2) => !password2)}
                        />
                    </Stack>

                    <Input label="직업" name="job" value={job} onChange={signFormChange} />

                    <Input label="경력" name="job_duration" value={job_duration} onChange={signFormChange} />
                </InputWrapper>

                <Button onClick={() => mutate()}>가입하기</Button>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;
const Title = styled.div`
    font-size: 30px;
    font-weight: 700;
`;
const Description = styled.div`
    display: flex;
    font-size: 20px;
    font-weight: 700;
`;
const Highlight = styled.div`
    color: ${color.primaryDefault};
`;

const InputWrapper = styled.div`
    display: flex;
    width: 400px;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
`;
