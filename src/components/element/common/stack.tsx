import React, { ReactNode } from "react";
import styled from "styled-components";

type directionType = "row" | "column" | "row-reverse" | "column-reverse";
type itemType =
    | "start"
    | "center"
    | "end"
    | "space-around"
    | "space-between"
    | "space-evenly";
type positionType = "static" | "relative" | "absolute" | "fixed" | "sticky";
type wrapType = "nowrap" | "wrap" | "wrap-reverse";

interface propsType {
    width?: number;
    height?: number;
    direction?: directionType;
    align?: itemType;
    justify?: itemType;
    gap?: number;
    margin?: [number, number, number, number];
    wrap?: wrapType;
    children?: ReactNode;
    position?: positionType;
}

interface stylePropsType {
    width?: number;
    height?: number;
    direction?: directionType;
    $align?: itemType;
    $justify?: itemType;
    $gap?: number;
    $margin?: [number, number, number, number];
    wrap?: wrapType;
    children?: ReactNode;
    $position?: positionType;
}

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
    width: ${({ width }) => width}%;
    height: ${({ height }) => height}px;
    display: flex;
    flex-direction: ${({ direction }) => direction};
    align-items: ${({ $align }) => $align};
    justify-content: ${({ $justify }) => $justify};
    flex-wrap: ${({ wrap }) => wrap};
    gap: ${({ $gap }) => $gap}px;
    margin: ${({ $margin }) => $margin?.join("px ")};
`;
