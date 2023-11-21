import Header from '@/components/organism/header';
import SolvingQuestionCompo from '@/components/organism/solvingQuestion';
import React from 'react';

export default function SolvingQuestionPage({ params }: { params: { questionId: string } }) {
    return (
        <>
            <Header />
            <SolvingQuestionCompo questionId={params.questionId} />
        </>
    );
}
