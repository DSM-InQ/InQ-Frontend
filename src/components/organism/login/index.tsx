"use client";
import { useForm } from "@/hooks/useForm";
import { color } from "@/styles/theme";
import React, { useState } from "react";
import styled from "styled-components";
import closeEye from "public/assets/svg/closeEye.svg";
import openEye from "public/assets/svg/openEye.svg";
import { Login } from "@/apis/login";
import { CheckBox, Input } from "@/components/designSystem/common/input";
import Button from "@/components/designSystem/common/button";
import { Stack } from "@/components/designSystem/common/stack";

export default function LoginCompo() {
    const [checkBox, setCheckBox] = useState(false);
    const [isPassword, setIsPassword] = useState(true);
    const { form: signForm, handleChange: signFormChange } = useForm({
        account_id: "",
        password: "",
    });
    const { account_id, password } = signForm;

    const { mutate } = Login(signForm, checkBox);

    return (
        <Container>
            <Wrapper>
                <HeaderText>로그인</HeaderText>
                <BigLine />
                <Input
                    label="이메일"
                    name="account_id"
                    value={account_id}
                    onChange={signFormChange}
                />
                <Input
                    label="비밀번호"
                    name="password"
                    value={password}
                    type={isPassword ? "password" : "text"}
                    onChange={signFormChange}
                    margin={[24, 0, 78, 0]}
                    icon={isPassword ? closeEye : openEye}
                    iconClick={() => setIsPassword((password) => !password)}
                />
                <CheckBox
                    text="아이디 저장"
                    onChange={() => setCheckBox((check) => !check)}
                    checked={checkBox}
                />
                <Button
                    onClick={() => {
                        mutate();
                    }}
                    disabled={!account_id && !password}
                    margin={[38, 0, 65, 0]}
                >
                    로그인
                </Button>
                <Stack width="100%" gap={32} align="center" justify="center">
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
