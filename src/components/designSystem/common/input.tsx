import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { color } from "@/styles/theme";

type inputType = "text" | "password" | "number";

interface inputPropsType {
    width?: number;
    placeholder?: string;
    disabled?: boolean;
    icon?: string;
    iconClick?: () => void;
    label?: string;
    type?: inputType;
    margin?: [number, number, number, number];
    $isError?: boolean;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface checkBoxPropsType {
    disabled?: boolean;
    text?: string;
    margin?: [number, number, number, number];
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
    width = 100,
    placeholder,
    disabled = false,
    icon,
    iconClick,
    label,
    type = "text",
    margin = [0, 0, 0, 0],
    $isError = false,
    name,
    value,
    onChange,
}: inputPropsType) {
    return (
        <InputContainer width={width} $margin={margin}>
            <label>
                <Label>{label}</Label>
                <InputStyle
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    width={width}
                    $isError={$isError && !!value}
                    placeholder={placeholder}
                    disabled={disabled}
                />
            </label>
            {$isError && !!value && <ErrorMessage>asdf</ErrorMessage>}
            {icon && <ImageStyle src={icon} alt="" onClick={iconClick} />}
        </InputContainer>
    );
}

export function CheckBox({
    disabled = false,
    text,
    margin = [0, 0, 0, 0],
    checked,
    onChange,
}: checkBoxPropsType) {
    return (
        <CheckBoxContainer $margin={margin}>
            <CheckBoxStyle
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
            <SideText>{text}</SideText>
        </CheckBoxContainer>
    );
}

// type이 text거나 number일 때 쓰는 스타일
const InputContainer = styled.div<{
    width: number;
    $margin: [number, number, number, number];
}>`
    position: relative;
    display: flex;
    flex-direction: column;
    width: ${({ width }) => width + "%"};
    gap: 6px;
    margin: ${({ $margin }) => $margin.join("px ")}px;
`;

const Label = styled.div`
    font-size: 14px;
    font-weight: 400;
    margin: 6px;
    color: ${color.gray6};
`;

const InputStyle = styled.input<{ $isError?: boolean }>`
    width: 100%;
    height: 46px;
    border: ${({ $isError }) =>
        $isError
            ? `1px solid ${color.errorDefault}`
            : `1px solid ${color.gray5}`};
    border-radius: 4px;
    font-size: 16px;
    padding: 0 50px 0 10px;
    &:focus {
        border: ${({ $isError }) =>
            $isError
                ? `1px solid ${color.errorDefault}`
                : `2px solid ${color.primaryDefault}`};
    }
`;

const ImageStyle = styled(Image)`
    position: absolute;
    width: 25px;
    height: 25px;
    top: 39px;
    right: 14px;
`;

const ErrorMessage = styled.div`
    position: absolute;
    bottom: -18px;
    left: 16px;
    font-size: 12px;
    font-weight: 400;
    color: ${color.errorDefault};
`;

// type이 checkBox일 때 쓰는 스타일
const CheckBoxContainer = styled.label<{
    $margin: [number, number, number, number];
}>`
    width: 125px;
    height: 30px;
    display: flex;
    align-items: center;
    gap: 5px;
    margin: ${({ $margin }) => $margin.join("px ")}px;
`;

const CheckBoxStyle = styled.input`
    appearance: none;
    width: 24px;
    height: 24px;
    margin: 0;
    border: 2px solid ${color.gray5};
    border-radius: 2px;
    &:checked {
        border-color: transparent;
        background-image: url("/assets/svg/check.svg");
        background-size: 80% 80%;
        background-position: 50%;
        background-repeat: no-repeat;
        background-color: ${color.primaryDefault};
    }
    &:disabled {
        border-color: ${color.gray3};
        background-color: ${color.gray2};
    }
`;

const SideText = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: ${color.gray6};
    margin: -3px 0 0 14px;
`;
