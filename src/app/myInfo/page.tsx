import MyInfoCompo from '@/components/organism/myInfo';
import Header from '@/components/organism/header';
import React from 'react';

/**
 * @returns 유저정보 조회 페이지
 */
export default function MyInfoPage() {
    return (
        <>
            <Header />
            <MyInfoCompo />
        </>
    );
}
