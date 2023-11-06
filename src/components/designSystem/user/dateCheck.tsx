import React, { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { color } from '@/styles/theme';
import dateCheck from 'public/assets/svg/dateCheck.svg';

interface propsType {
    // check: boolean;
    day: string;
}

export default function DateCheck({ day }: propsType) {
    const [imageDisplay, setImageDisplay] = useState('block');
    const [noImageDisplay, setNoImageDisplay] = useState('none');

    // useEffect(() => {
    //     if (checkValue === true) {
    //         setImageDisplay('block');
    //         setNoImageDisplay('none');
    //     }
    // }, []);

    return (
        <DateCheckContainer>
            <NoImage display={noImageDisplay}>
                <div></div>
            </NoImage>
            <ImageStyle display={imageDisplay} src={dateCheck} alt="" />
            <Text>{day}</Text>
        </DateCheckContainer>
    );
}

const DateCheckContainer = styled.div`
    width: 120px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
`;

const NoImage = styled.div<{
    display: string;
}>`
    width: 120px;
    height: 120px;
    display: ${({ display }) => display};
    border: 2px solid ${color.gray5};
    border-radius: 100px;
`;

const ImageStyle = styled(Image)<{
    display: string;
}>`
    display: ${({ display }) => display};
    width: 100%;
    height: 100%;
`;

const Text = styled.div`
    display: flex;
    justify-content: center;
    font-size: 18px;
    font-weight: 400;
`;
