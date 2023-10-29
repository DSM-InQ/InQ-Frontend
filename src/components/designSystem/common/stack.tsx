import React, { ReactNode } from "react";
import styled, { CSSProperties } from "styled-components";

interface propsType {
    width?: string;
    height?: number;
    direction?: CSSProperties["flexDirection"];
    align?: CSSProperties["alignItems"];
    justify?: CSSProperties["justifyContent"];
    gap?: number;
    margin?: CSSProperties["margin"];
    wrap?: CSSProperties["flexWrap"];
    children?: ReactNode;
    position?: CSSProperties["position"];
}

interface stylePropsType {
    width?: string;
    height?: number;
    direction?: CSSProperties["flexDirection"];
    $align?: CSSProperties["alignItems"];
    $justify?: CSSProperties["justifyContent"];
    $gap?: number;
    $margin?: CSSProperties["margin"];
    wrap?: CSSProperties["flexWrap"];
    children?: ReactNode;
    $position?: CSSProperties["position"];
}

/**
 * @param width string으로 넣으면 됨 ex) '100%'
 * @param height string으로 넣으면 됨 ex) '100%'
 * @param direction flex-direction 넣듯이 string으로 넣으면 됨
 * @param align align-items 넣듯이 string으로 넣으면 됨
 * @param justify justify-content 넣듯이 string으로 넣으면 됨
 * @param gap 요소들간에 격차
 * @param wrap flex-wrap 넣듯이 string으로 넣으면 됨
 * @param margin 문자열로 넣으면 됨 ex) '10px' ex) '10px 10px'
 * @param children ReactNode
 * @param position position 넣듯이 string으로 넣으면 됨
 * @returns stack components
 */
export const Stack = ({
    width,
    height,
    direction,
    align,
    justify,
    gap,
    wrap,
    margin,
    children,
    position = "static",
}: propsType) => {
    return (
        <Container
            width={width}
            height={height}
            direction={direction}
            $align={align}
            $justify={justify}
            $gap={gap}
            wrap={wrap}
            $margin={margin}
            $position={position}
        >
            {children}
        </Container>
    );
};

const Container = styled.div<stylePropsType>`
    position: ${({ $position }) => $position};
    width: ${({ width }) => width};
    height: ${({ height }) => height}px;
    display: flex;
    flex-direction: ${({ direction }) => direction};
    align-items: ${({ $align }) => $align};
    justify-content: ${({ $justify }) => $justify};
    flex-wrap: ${({ wrap }) => wrap};
    gap: ${({ $gap }) => $gap}px;
    margin: ${({ $margin }) => $margin};
`;