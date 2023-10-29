import React, { ReactNode } from "react";
import Image from "next/image";
import styled, { css, CSSProperties } from "styled-components";
import { color } from "@/styles/theme";

type buttonType = "Solid" | "Outline";

interface propsType {
    width?: string;
    disabled?: boolean;
    icon?: string;
    margin?: CSSProperties["margin"];
    type?: buttonType;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
}

/**
 * @param width width를 문장으로 넣으면 됨 ex) '10px'
 * @param onClick 클릭했을 때 실행할 함수
 * @param disabled 어떨 때 disabled인지
 * @param icon 버튼 안에 들어갈 이미지
 * @param margin 문자열로 넣으면 됨 ex) '10px' ex) '10px 10px'
 * @param type 버튼을 어떤 스타일로 할 것인지
 * @param children 버튼 안에 들어갈 문자열
 * @returns 버튼 components
 */
export default function Button({
    width = "100%",
    onClick,
    disabled = false,
    icon = "",
    margin = 0,
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
    $margin: CSSProperties["margin"];
    type: buttonType;
}>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ width }) => width};
    height: 50px;
    font-size: 14px;
    border: ${({ type }) =>
        type === "Outline" ? css`1px solid ${color.primaryDarken2}` : "none"};
    background-color: ${({ type }) =>
        type === "Outline" ? "white" : color.primaryDefault};
    color: ${({ type }) =>
        type === "Outline" ? color.primaryDarken2 : "white"};
    border-radius: 4px;
    font-weight: 700;
    margin: ${({ $margin }) => $margin};
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
