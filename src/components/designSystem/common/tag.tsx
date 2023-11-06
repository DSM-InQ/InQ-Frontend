import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { color } from '@/styles/theme';
import x from 'public/assets/svg/x.svg';

interface propsType {
    value: string;
    display?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Tag({ value, display = 'block', onClick }: propsType) {
    return (
        <TagStyle>
            <TextStyle>{`#${value}`}</TextStyle>
            <BtnStyle display={display} onClick={onClick}>
                <ImageStyle src={x} alt="" />
            </BtnStyle>
        </TagStyle>
    );
}

const TagStyle = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    border: 1px solid ${color.gray5};
    border-radius: 6px;
    gap: 12px;
`;

const TextStyle = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: ${color.gray5};
`;

const BtnStyle = styled.button<{
    display: string;
}>`
    padding: 0;
    display: ${({ display }) => display};
    width: 12px;
    height: 12px;
    background-color: transparent;
    border: none;
`;

const ImageStyle = styled(Image)`
    width: 12px;
    height: 12px;
`;
