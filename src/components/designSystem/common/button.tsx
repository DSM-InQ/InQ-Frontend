import React, { ReactNode } from "react";
import Image from "next/image";
import styled from "styled-components";
import { color } from "@/styles/theme";

type buttonType = "Solid" | "Outline";

interface propsType {
    width?: string;
    disabled?: boolean;
    icon?: string;
    margin?: [number, number, number, number];
    type?: buttonType;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
}

export default function Button({
    width = "100%",
    onClick,
    disabled = false,
    icon = "",
    margin = [0, 0, 0, 0],
    type = "Solid",
    children,
}: propsType) {
    return (
        <BtnStyle
            onClick={onClick}
            width={width}
            disabled={disabled}
            $margin={margin}
            type={type}
        >
            {children}
            {icon && <ImageStyle src={icon} alt="" />}
        </BtnStyle>
    );
}

const BtnStyle = styled.button<{
    width: string;
    $margin: [number, number, number, number];
    type: buttonType;
}>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ width }) => width};
    height: 50px;
    font-size: 14px;
    border: ${({ type }) =>
        type === "Outline" ? `1px solid ${color.primaryDarken2}` : "none"};
    background-color: ${({ type }) =>
        type === "Outline" ? "white" : color.primaryDefault};
    color: ${({ type }) =>
        type === "Outline" ? `${color.primaryDarken2}` : "white"};
    border-radius: 4px;
    font-weight: 700;
    margin: ${({ $margin }) => $margin.join("px ")}px;
    cursor: pointer;
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const ImageStyle = styled(Image)`
    width: 30px;
    height: 30px;
    top: 7px;
    right: 5px;
`;
