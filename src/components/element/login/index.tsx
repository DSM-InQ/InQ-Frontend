"use client";
import { useForm } from "@/hooks/useForm";
import { color } from "@/styles/theme";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../common/button";
import { CheckBox, Input } from "../common/input";
import { Stack } from "../common/stack";

export default function Login() {
    const [checkBox, setCheckBox] = useState(false);
    const { form: signForm, handleChange: signFormChange } = useForm({
        email: "",
        password: "",
    });
    const { email, password } = signForm;
    return (
        <Container>
            <Wrapper>
                <HeaderText>로그인</HeaderText>
                <BigLine />
                <Input
                    label="이메일"
                    name="email"
                    value={email}
                    onChange={signFormChange}
                />
                <Input
                    label="비밀번호"
                    name="password"
                    value={password}
                    onChange={signFormChange}
                    margin={[24, 0, 78, 0]}
                />
                <CheckBox
                    text="아이디 저장"
                    onChange={() => setCheckBox((check) => !check)}
                    checked={checkBox}
                />
                <Button onClick={() => {}} margin={[38, 0, 65, 0]}>
                    로그인
                </Button>
                <Stack width={100} gap={32} align="center" justify="center">
                    <OptionText>아이디 찾기</OptionText>
                    <SmallLine />
                    <OptionText>비밀번호 변경</OptionText>
                </Stack>
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
    width: 480px;
    height: 600px;
`;

const HeaderText = styled.div`
    font-size: 24px;
`;

const BigLine = styled.div`
    width: 100%;
    border: 0.5px solid ${color.primaryDefault};
    margin: 8px 0 56px 0;
`;

const OptionText = styled.div`
    font-size: 14px;
    font-weight: 700;
`;

const SmallLine = styled.div`
    height: 16px;
    border: 1px solid black;
`;
