'use client';
import { color } from '@/styles/theme';
import up from 'public/assets/svg/up.svg';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Text } from '@/components/designSystem/common/text';
import PopularQuestionBox from '@/components/designSystem/main/popularQuestionBox';
import { Stack } from '@/components/designSystem/common/stack';
import PopularQuestionSetBox from '@/components/designSystem/main/popularQuestionSetBox';
import { categoryImg, categoryType } from '@/utils/Translation';
import { getValueByKey } from '@/utils/useGetPropertyKey';
import Button from '@/components/designSystem/common/button';

/** @returns 질문세트 만들기 Box components */
export default function MakeQuestion() {
    return (
        <Container>
            <Stack gap={5} direction="column" width="100%" padding="43px 51px">
                <Text size={24} color={color.primaryDefault}>
                    면접 질문 만들기
                </Text>
                <Text size={18} color={color.gray6}>
                    내가 면접관이라면 어떤 질문을 할까? 직접 구상하여 다른 사용자와 공유해요!
                </Text>
                <Btn>질문 만들기</Btn>
            </Stack>
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    width: 1100px;
    height: 148px;
    border-radius: 8px;
    border: 1px solid ${color.gray4};
    background: ${color.gray1};
`;

const Btn = styled.button`
    position: absolute;
    right: 26px;
    bottom: 26px;
    width: 100px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid ${color.primaryDefault};
    background-color: ${color.gray1};
    color: ${color.primaryDefault};
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
`;
