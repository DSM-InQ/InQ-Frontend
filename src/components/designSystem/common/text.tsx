import React, { CSSProperties, HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

interface propsType extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    weight?: number;
    color?: string;
    margin?: CSSProperties["margin"];
    onClick?: () => void;
    cursor?: CSSProperties["cursor"];
    children: ReactNode;
}

/**
 * @param size 폰트 사이즈 숫자로 넣으면 됨
 * @param weight 폰트 두께 숫자로 넣으면 됨
 * @param color 글자색
 * @param margin 문자열로 넣으면 됨 ex) '10px' ex) '10px 10px'
 * @param onClick 선택지 클릭시 해당 함수를 실행함
 * @param cursor cursor 넣듯이 string으로 넣으면 됨
 * @param children 넣고 싶은 문장이나 글자
 * @returns Text components
 */
export const Text = ({
    size = 18,
    weight = 400,
    color = "black",
    margin = 0,
    onClick,
    cursor,
    children,
}: propsType) => {
    return (
        <TextStyle
            size={size}
            $weight={weight}
            color={color}
            $margin={margin}
            onClick={onClick}
            $cursor={cursor}
        >
            {children}
        </TextStyle>
    );
};

const TextStyle = styled.div<{
    size: number;
    $weight: number;
    color: string;
    $margin: CSSProperties["margin"];
    $cursor: CSSProperties["cursor"];
}>`
    font-size: ${({ size }) => size}px;
    font-weight: ${({ $weight }) => $weight};
    color: ${({ color }) => color};
    margin: ${({ $margin }) => $margin};
    cursor: ${({ $cursor }) => $cursor};
`;
