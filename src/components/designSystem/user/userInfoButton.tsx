import React, { useState } from 'react';
import styled from 'styled-components';
import { color } from '@/styles/theme';
import { useRouter } from 'next/navigation';

interface propsType {
    label: string;
    url: string;
}

/**
 * @param label string으로 넣으면 됨
 * @param labelColor string으로 넣으면 됨
 * @param background string으로 넣으면 됨
 * @param border string으로 넣으면 됨 ex) `1px soild ${color.gray4}`
 * @param url string으로 넣으면 됨 ex) '/myInfo'
 * @returns userInfoButton components
 */
export function UserInfoButton({ label, url }: propsType) {
    const router = useRouter();
    const [labelColor, setLabelColor] = useState(`${color.gray5}`);
    const [background, setBackground] = useState('transparent');
    const [border, setBorder] = useState(`1px solid ${color.gray4}`);

    return (
        <BtnContainer
            backgroundColor={background}
            border={border}
            onClick={() => {
                if (labelColor === `${color.gray5}`) {
                    setLabelColor(`${color.gray1}`);
                    setBackground(`${color.primaryDefault}`);
                    setBorder('none');
                    router.push(url);
                } else {
                    setLabelColor(`${color.gray5}`);
                    setBackground('transparent');
                    setBorder(`1px soild ${color.gray4}`);
                }
            }}
        >
            <Label color={labelColor}>{label}</Label>
        </BtnContainer>
    );
}

const BtnContainer = styled.button<{
    backgroundColor: string;
    border: string;
}>`
    width: 100%;
    height: 60px;
    background-color: ${({ backgroundColor }) => backgroundColor};
    border: ${({ border }) => border};
    border-radius: 50px;
`;

const Label = styled.div<{
    color: string;
}>`
    font-size: 18px;
    font-weight: 600;
    color: ${({ color }) => color};
`;
