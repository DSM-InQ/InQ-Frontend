import React from 'react';
import styled from 'styled-components';
import { color } from '@/styles/theme';

interface textareaPropsType {
    width?: number;
    height: number;
    placeholder?: string;
    label?: string;
    margin?: [number, number, number, number];
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export function Textarea({
    width = 100,
    height,
    placeholder,
    label,
    margin = [0, 0, 0, 0],
    name,
    value,
    onChange,
    onKeyDown,
}: textareaPropsType) {
    return (
        <TextareaContainer width={width} $margin={margin}>
            <Label>{label}</Label>
            <TextareaStyle
                name={name}
                value={value}
                height={height}
                onKeyDown={onKeyDown}
                onChange={onChange}
                placeholder={placeholder}
            />
        </TextareaContainer>
    );
}

const TextareaContainer = styled.div<{
    width: number;
    $margin: [number, number, number, number];
}>`
    margin: ${({ $margin }) => $margin.join('px ')};
    display: flex;
    flex-direction: column;
    width: ${({ width }) => width + '%'};
    gap: 5px;
`;

const Label = styled.div`
    font-size: 14px;
    font-weight: 400;
    margin: 6px;
    color: ${color.gray6};
`;

const TextareaStyle = styled.textarea<{
    height: number;
}>`
    padding: 10px;
    width: 100%;
    height: ${({ height }) => height + 'px'};
    border: 1px solid ${color.gray5};
    border-radius: 4px;
    font-size: 16px;
    font-family: 'Noto_Sans_KR';

    &::placeholder {
        color: ${color.gray5};
    }
`;
