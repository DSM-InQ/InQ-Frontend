// ✅

import Header from '@/components/organism/header';
import RegisterQuestionCompo from '@/components/organism/registerQuestion';
import React from 'react';

/** @returns 질문 등록 page */
export default function RegisterQuestionPage() {
    return (
        <>
            <Header />
            <RegisterQuestionCompo />
        </>
    );
}
