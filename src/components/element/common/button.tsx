import React, { ReactNode } from "react";
import Image from "next/image";
import styled from "styled-components";
import { color } from "@/styles/theme";

interface propsType {
    width?: number;
    disabled?: boolean;
    icon?: string;
    margin?: [number, number, number, number];
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
}

export default function Button({
    width = 100,
    onClick,
    disabled = false,
    icon = "",
    margin = [0, 0, 0, 0],
    children,
}: propsType) {
    return (
        <BtnStyle
            onClick={onClick}
            width={width}
            disabled={disabled}
            $margin={margin}
        >
            {children}
            {icon && <ImageStyle src={icon} alt="" />}
        </BtnStyle>
    );
}

const BtnStyle = styled.button<{
    width: number;
    $margin: [number, number, number, number];
}>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ width }) => width + "%"};
    height: 50px;
    border: none;
    border-radius: 4px;
    background-color: ${color.primaryDefault};
    font-size: 14px;
    color: white;
    font-weight: 700;
    margin: ${({ $margin }) => $margin.join("px ")};
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
