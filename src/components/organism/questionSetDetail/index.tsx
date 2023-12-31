'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { color } from '@/styles/theme';
import backImg from 'public/assets/svg/backImg.svg';
import thumbs from 'public/assets/svg/thumbs.svg';
import clickThumbs from 'public/assets/svg/clickThumbs.svg';
import user from 'public/assets/svg/user.svg';
import commentFormImg from 'public/assets/svg/commentFormImg.svg';
import up from 'public/assets/svg/up.svg';
import Image from 'next/image';
import { Stack } from '@/components/designSystem/common/stack';
import { Text } from '@/components/designSystem/common/text';
import { useGetSetDetail, useSetDislike, useSetLike } from '@/apis/question';
import { useRouter } from 'next/navigation';
import { categoryImg, categoryType } from '@/utils/Translation';
import { getValueByKey } from '@/utils/useGetPropertyKey';
import { useSetWriteComment } from '@/apis/comment';
import { useInput } from '@/hooks/useInput';

interface propsType {
    setId: string;
}

/**
 * @param id 질문세트 id
 * @returns 질문세트 상세보기 page
 * */
export default function QuestionSetDetail({ setId }: propsType) {
    const [count, setCount] = useState(1);
    /** 라우팅을 위한 router 생성 */
    const router = useRouter();

    /** 키워드 input의 state */
    const { form, setForm, handleChange } = useInput('');

    /** 질문세트 상세보기 data */
    const { data, refetch } = useGetSetDetail(setId);
    /** 질문세트 댓글달기 api 호출입니다. */
    const { mutate: writeCommentMutate } = useSetWriteComment(setId, form, {
        onSuccess: () => {
            alert('댓글이 성공적으로 작성되었습니다.');
            setForm('');
            refetch();
        },
        onError: () => {
            alert('댓글 작성을 실패하였습니다.');
        },
    });
    /** 질문세트 싫어요 api 호출입니다. */
    const { mutate: dislikeMutate } = useSetDislike(setId, {
        onSuccess: () => {
            refetch();
        },
        onError: () => {
            alert('싫어요를 실패하였습니다.');
        },
    });
    /** 질문세트 좋아요 api 호출입니다. */
    const { mutate: likeMutate } = useSetLike(setId, {
        onSuccess: () => {
            refetch();
        },
        onError: () => {
            alert('좋아요를 실패하였습니다.');
        },
    });
    return (
        <Container>
            <Stack width="1100px" direction="column">
                <Image
                    src={backImg}
                    alt=""
                    style={{ marginBottom: '80px', cursor: 'pointer' }}
                    onClick={() => {
                        router.back();
                    }}
                />
                <Stack margin={'0 0 30px 0'}>
                    <Stack width="100%" direction="column" align="space-between">
                        <Text size={32} weight={700}>
                            {data?.name}
                        </Text>
                        <Text color={color.gray6}>
                            {data?.username} · {data?.job} {data?.job_duration}
                            년차
                        </Text>
                    </Stack>
                    <Stack gap={16}>
                        <Stack
                            gap={6}
                            cursor={data?.is_disliked ? 'not-allowed' : 'pointer'}
                            onClick={() => {
                                !data?.is_disliked && likeMutate();
                            }}
                        >
                            <Image
                                src={data?.is_liked ? clickThumbs : thumbs}
                                alt=""
                                style={{ width: '20px', height: '20px' }}
                            />
                            <Text size={16}>{data?.like_count}</Text>
                        </Stack>
                        <Stack
                            gap={6}
                            cursor={data?.is_liked ? 'not-allowed' : 'pointer'}
                            onClick={() => {
                                !data?.is_liked && dislikeMutate();
                            }}
                        >
                            <Image
                                src={data?.is_disliked ? clickThumbs : thumbs}
                                alt=""
                                style={{
                                    rotate: '180deg',
                                    width: '20px',
                                    height: '20px',
                                }}
                            />
                            <Text size={16}>{data?.dislike_count}</Text>
                        </Stack>
                        <Stack gap={6}>
                            <Image src={user} alt="" />
                            <Text size={16}>{data?.view_count}</Text>
                        </Stack>
                    </Stack>
                </Stack>
                <Text size={18}>{data?.description}</Text>
                <Text color={color.gray6} margin={'40px 0 20px 0'}>
                    질문 구성
                </Text>
                <Stack justify="space-between" align="flex-end">
                    <Stack gap={50}>
                        {data?.category.map((item, i) => {
                            return (
                                <Stack key={i} direction="column" gap={14} align="center">
                                    <QuestionTypeImg>
                                        <Image src={categoryImg[item.category]} alt="" />
                                    </QuestionTypeImg>
                                    <Text>{`${getValueByKey(categoryType, item.category)} 질문 ${item.count}개`}</Text>
                                </Stack>
                            );
                        })}
                    </Stack>
                    <StartBtn
                        onClick={() => {
                            router.push(`/set/${setId}/questionInSet/${data?.question_id_list[0]}`);
                        }}
                    >
                        풀어보기
                        <Image src={up} alt="" />
                    </StartBtn>
                </Stack>
                <CommentWrapper>
                    <Text color={color.gray6}>댓글</Text>
                    <Stack position="relative" width="100%">
                        <CommentInput
                            type="text"
                            placeholder="질문 세트를 모두 풀어본 뒤에 댓글을 작성할 수 있습니다."
                            value={form}
                            onChange={handleChange}
                            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === 'Enter') {
                                    writeCommentMutate();
                                }
                            }}
                        />
                        <Image
                            src={commentFormImg}
                            alt=""
                            style={{
                                position: 'absolute',
                                right: '15px',
                                top: '10px',
                            }}
                            onClick={() => writeCommentMutate()}
                        />
                    </Stack>
                    {data?.comments.map((item, i) => {
                        return (
                            <CommentBox key={i}>
                                <Text size={13}>
                                    {item.username} · {item.job} {item.job_duration}
                                    년차
                                </Text>
                                <Text size={16}>{item.comment}</Text>
                            </CommentBox>
                        );
                    })}
                </CommentWrapper>
            </Stack>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    margin: 60px 0;
`;

const QuestionTypeImg = styled.div`
    width: 100px;
    height: 100px;
    border: 1px solid ${color.gray4};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StartBtn = styled.button`
    width: 150px;
    height: 50px;
    border-radius: 100px;
    background: ${color.primaryDefault};
    color: ${color.gray1};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    border: none;
    gap: 10px;
`;

const CommentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    padding: 36px;
    border: 1px solid ${color.gray5};
    margin-top: 64px;
    border-radius: 4px;
`;

const CommentInput = styled.input`
    width: 100%;
    height: 46px;
    border: 1px solid ${color.gray5};
    background: ${color.gray2};
    border-radius: 4px;
    font-size: 16px;
    font-weight: 400;
    padding: 0 54px 0 15px;
`;

const CommentBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    padding: 10px 18px;
    border: 1px solid ${color.gray5};
    border-radius: 4px;
`;
