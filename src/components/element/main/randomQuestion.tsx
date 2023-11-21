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

/** @returns 랜덤 질문 풀어보기 Box components */
export default function RandomQuestion() {
    const categoryArray = ['개발', '마케팅', '기획', '상식', '학습', '경력', '인성'];
    return (
        <Container>
            <Stack gap={19} direction="column" width="100%">
                <Text size={18} color={color.gray6}>
                    무작위 질문
                </Text>
                <Stack padding="0 20px" justify="space-between">
                    {categoryArray.map((item, i) => {
                        return (
                            <Category key={i}>
                                <Image src={categoryImg[categoryType[item]]} alt="" />#{item}
                            </Category>
                        );
                    })}
                </Stack>
            </Stack>
            <StartBtn>
                무작위 질문에 답변해보기
                <Image src={up} alt="" style={{ marginTop: '-3px' }} />
            </StartBtn>
        </Container>
    );
}

const Container = styled.div`
    width: 1100px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 38px;
`;

const Category = styled.div`
    width: 100px;
    height: 100px;
    border: 1px solid ${color.gray4};
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StartBtn = styled.button`
    width: 250px;
    height: 50px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    background: ${color.primaryDefault};
    color: ${color.gray1};
    font-size: 16px;
    font-weight: 500;
    gap: 8px;
    cursor: pointer;
`;
