"use client";
import { useForm } from "@/hooks/useForm";
import { color } from "@/styles/theme";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import closeEye from "public/assets/svg/closeEye.svg";
import openEye from "public/assets/svg/openEye.svg";
import { Login } from "@/apis/login";
import { CheckBox, Input } from "@/components/designSystem/common/input";
import Button from "@/components/designSystem/common/button";
import { Stack } from "@/components/designSystem/common/stack";
import { getCookie } from "cookies-next";

/** @returns 로그인 page */
export default function LoginCompo() {
    /** 체크박스 선택 구분을 위한 state */
    const [checkBox, setCheckBox] = useState(!!getCookie("account_id"));
    /** 비밀번호 input type 구분을 위한 state */
    const [isPassword, setIsPassword] = useState(true);
    /** 로그인 data */
    const { form: signForm, handleChange: signFormChange } = useForm({
        account_id: getCookie("account_id") || "",
        password: "",
    });
    /** 로그인 data를 구조분해할당 해놓은 부분 */
    const { account_id, password } = signForm;
    /** button disabled 관리를 위한 state입니다. */
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    /** id나 password가 변경되면 disabled 상태를 업데이트를 하기 위한 useEffect */
    useEffect(() => {
        if (account_id && password) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [account_id, password]);

    /** 로그인 api 호출 */
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
                    margin="24px 0 78px 0"
                    icon={isPassword ? closeEye : openEye}
                    iconClick={() => setIsPassword((password) => !password)}
                    onForm={() => mutate()}
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
                    disabled={isDisabled}
                    margin="38px 0 65px 0"
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
