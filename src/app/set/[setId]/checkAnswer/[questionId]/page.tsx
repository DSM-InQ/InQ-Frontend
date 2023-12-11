import CheckAnswerCompo from '@/components/organism/checkAnswer';
import Header from '@/components/organism/header';
import React from 'react';

/**
 * @returns 답변 확인 page
 */
export default function CheckAnswerPage({ params }: { params: { setId: string; questionId: string } }) {
    return (
        <>
            <Header />
            <CheckAnswerCompo setId={params.setId} questionId={params.questionId} />
        </>
    );
}
