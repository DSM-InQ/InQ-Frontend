'use client';
import React from 'react';
import styled from 'styled-components';
import { color } from '@/styles/theme';
import logo from 'public/assets/svg/logo.svg';
import personImg from 'public/assets/svg/personImg.svg';
import Image from 'next/image';
import { Stack } from '@/components/designSystem/common/stack';
import { useRouter, usePathname } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

/** @returns Header components */
export default function Header() {
    /** 라우팅을 위한 router 생성 */
    const router = useRouter();
    /** pathname 확인을 위해 생성 */
    const pathname = usePathname();
    return (
        <>
            <Container>
                <Stack align="center" width="434px" justify="space-between">
                    <Image src={logo} alt="" onClick={() => router.push('/')} style={{ cursor: 'pointer' }} />
                    <Text
                        onClick={() => router.push('/registerQuestion')}
                        $isSelect={pathname.includes('registerQuestion')}
                    >
                        질문 등록
                    </Text>
                    <Text onClick={() => router.push('/registerSet')} $isSelect={pathname.includes('registerSet')}>
                        질문세트 등록
                    </Text>
                    <Text
                        onClick={() => router.push('/searchQuestion')}
                        $isSelect={pathname.includes('searchQuestion')}
                    >
                        질문 찾기
                    </Text>
                </Stack>
                <Stack align="center" width="134px" justify="space-between">
                    <Text
                        onClick={() => {
                            deleteCookie('access_token');
                            router.push('/login');
                        }}
                    >
                        로그아웃
                    </Text>
                    <Image
                        src={personImg}
                        alt=""
                        style={{ cursor: 'pointer' }}
                        onClick={() => router.push('/myInfo')}
                    />
                </Stack>
            </Container>
            <Spacer />
        </>
    );
}

const Container = styled.div`
    position: fixed;
    top: 0px;
    width: 100vw;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50%;
    border-bottom: 1px solid #f0f2f4;
    background: ${color.gray1};
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    z-index: 999;
`;

const Text = styled.div<{ $isSelect?: boolean }>`
    color: #4a4a4a;
    font-size: 18px;
    font-weight: ${({ $isSelect }) => ($isSelect ? 700 : 400)};
    cursor: pointer;
    &:hover {
        font-weight: 700;
    }
`;

const Spacer = styled.div`
    height: 70px;
`;
