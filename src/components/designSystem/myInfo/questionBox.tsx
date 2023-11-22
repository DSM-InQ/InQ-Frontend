import React, { useState } from 'react';
import styled from 'styled-components';
import star from 'public/assets/svg/star.svg';
import emptystar from 'public/assets/svg/emptyStar.svg';
import Image from 'next/image';
import { color } from '@/styles/theme';
import { Stack } from '../common/stack';
import { myQuestionType } from '@/apis/user/type';
import { getValueByKey } from '@/utils/useGetPropertyKey';
import { categoryType } from '@/utils/Translation';
import { Text } from '@/components/designSystem/common/text';
import { useQuestionFavorite } from '@/apis/question';

interface propsType {
    data: myQuestionType;
    refetch: () => void;
    checkBox?: boolean;
    onCheckBoxClick?: (questionId: number) => void;
}

/**
 * @param data 질문 / 질문세트 객체
 * @returns 질문 박스 components
 */
export const QuestionBox = ({ data, refetch, checkBox = false, onCheckBoxClick }: propsType) => {
    const [check, setCheck] = useState(false);
    /** 질문 즐겨찾기 요청 api입니다. */
    const { mutate: questionMutate, isLoading: questionIsLoading } = useQuestionFavorite(data?.question_id, {
        onSuccess: () => {
            refetch();
        },
        onError: () => {
            alert('즐겨찾기에 실패하였습니다.');
        },
    });

    return (
        <Container>
            <Stack justify="space-between" align="center">
                <CategoryText>{getValueByKey(categoryType, data?.category)}</CategoryText>
                <Stack gap={6} align="center">
                    <DateText>
                        {data?.created_at.slice(0, 10)} {data?.created_at.slice(11, 16)}
                    </DateText>
                    <FavoriteImg
                        src={data?.is_favorite ? star : emptystar}
                        alt=""
                        $isLoading={questionIsLoading}
                        display={checkBox}
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            !questionIsLoading && questionMutate();
                        }}
                    ></FavoriteImg>

                    <CheckBox
                        display={checkBox}
                        check={check}
                        onClick={() => {
                            if (!check) setCheck(true);
                            else setCheck(false);
                            onCheckBoxClick && onCheckBoxClick(data?.question_id);
                        }}
                    />
                </Stack>
            </Stack>
            <Stack gap={8} align="center">
                <TitleText>{data?.question}</TitleText>
            </Stack>
            <Stack justify="space-between">
                <UserText>{`${data?.username} · ${data?.job} ${data?.job_duration}년차`}</UserText>
                <Stack gap={4} margin={'0 -4px 0 0'}>
                    {data?.tags.map((item, i) => (
                        <Tag key={i}># {item}</Tag>
                    ))}
                </Stack>
            </Stack>
            <Text
                size={18}
                color={color.gray6}
                style={{
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {data?.exemplary_answer}
            </Text>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 191px;
    gap: 12px;
    border-radius: 8px;
    border: 1px solid ${color.gray4};
    background: ${color.gray1};
    padding: 0 38px;
    cursor: pointer;

    &:hover {
        background-color: ${color.gray2};
    }
`;

const CategoryText = styled.div`
    color: ${color.primaryDefault};
    font-size: 18px;
    font-weight: 400;
    margin-top: -6px;
`;

const DateText = styled.div`
    color: ${color.gray5};
    font-size: 13px;
    font-weight: 500;
    margin: 2px 4px 0 0;
`;

const NumText = styled.div`
    font-size: 13px;
    font-weight: 500;
`;

const TitleText = styled.div`
    font-size: 20px;
    font-weight: 400;
`;

const UserText = styled.div`
    font-size: 18px;
    font-weight: 400;
`;

const Tag = styled.div`
    display: flex;
    height: 26px;
    padding: 0px 10px;
    justify-content: center;
    align-items: center;
    border-radius: 13px;
    background: ${color.gray2};
    color: ${color.gray6};
    font-size: 13px;
    font-weight: 400;
`;

const FavoriteImg = styled(Image)<{
    $isLoading: boolean;
    display: boolean;
}>`
    width: 18px;
    height: 18px;
    display: ${(props) => (props.display ? 'none' : 'block')};
    cursor: ${({ $isLoading }) => ($isLoading ? 'not-allowed' : 'pointer')};
    z-index: 998;
    margin-left: 5px;
`;

const CheckBox = styled.button<{
    display: boolean;
    check: boolean;
}>`
    display: ${(props) => (props.display ? 'block' : 'none')};
    width: 24px;
    height: 24px;
    background: ${(props) => (props.check ? color.primaryDefault : color.gray1)};
    border: ${(props) => (props.check ? 'none' : `1px solid ${color.gray5}`)};
`;
