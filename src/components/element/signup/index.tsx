'use client';
import React from 'react';
import { useForm } from '@/hooks/useForm';
import { color } from '@/styles/theme';
import styled from 'styled-components';
import { Input } from '../common/input';
import Button from '../common/button';
import { Stack } from '../common/stack';

export default function SignUp() {
    const { form: signForm, handleChange: signFormChange } = useForm({
        id: '',
        userName: '',
        password: '',
        job: '',
        career: 0,
    });
    const { id, userName, password, job, career } = signForm;

    return (
        <Container>
            <Wrapper>
                <Header>
                    <Title>회원가입</Title>
                    <Description>
                        <Highlight>In</Highlight>terview<Stack margin={[0, 5, 0, 5]}>+</Stack>
                        <Highlight>Q</Highlight>uestion
                    </Description>
                </Header>

                <InputWrapper>
                    <Input label="아이디" name="id" value={id} onChange={signFormChange} />

                    <Input label="이름" name="userName" value={userName} onChange={signFormChange} />

                    <Stack direction="column" width={100}>
                        <Input label="비밀번호" name="password" value={password} onChange={signFormChange} />

                        <Input label="비밀번호 확인" name="password" value={password} onChange={signFormChange} />
                    </Stack>

                    <Input label="직업" name="job" value={job} onChange={signFormChange} />

                    <Input label="경력" name="career" value={career} onChange={signFormChange} />
                </InputWrapper>

                <Button onClick={() => {}}>가입하기</Button>
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
