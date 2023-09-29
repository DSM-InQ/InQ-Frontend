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
    label,
    type = "text",
    margin = [0, 0, 0, 0],
    name,
    value,
    onChange,
}: inputPropsType) {
    return (
        <InputContainer width={width} $margin={margin}>
            <label>
                <Label>{label}</Label>
                <InputStyle
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    width={width}
                    placeholder={placeholder}
                    disabled={disabled}
                />
            </label>
            {icon && <ImageStyle src={icon} alt="" />}
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
    margin: ${({ $margin }) => $margin.join("px ")};
`;

const Label = styled.div`
    font-size: 14px;
    font-weight: 400;
    margin: 6px;
    color: ${color.gray6};
`;

const InputStyle = styled.input`
    width: 100%;
    height: 46px;
    border: 1px solid ${color.gray5};
    border-radius: 4px;
    font-size: 16px;
    padding: 0 40px 0 10px;
`;

const ImageStyle = styled(Image)`
    position: absolute;
    width: 30px;
    height: 30px;
    top: 31px;
    right: 5px;
`;

// type이 checkBox일 때 쓰는 스타일
const CheckBoxContainer = styled.label<{
    $margin: [number, number, number, number];
}>`
    height: 30px;
    display: flex;
    align-items: center;
    gap: 5px;
    margin-left: -4px;
    margin: ${({ $margin }) => $margin.join("px ")};
`;

const CheckBoxStyle = styled.input`
    width: 24px;
    height: 24px;
    border: solid ${color.gray6};
`;

const SideText = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: ${color.gray6};
    margin: -3px 0 0 14px;
`;
