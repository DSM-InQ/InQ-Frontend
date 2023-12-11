import Header from '@/components/organism/header';
import QuestionInSetCompo from '@/components/organism/questionInSet';
import React from 'react';

export default function QuestionInSetPage({ params }: { params: { setId: string; questionId: string } }) {
    return (
        <>
            <Header />
            <QuestionInSetCompo setId={params.setId} questionId={params.questionId} />
        </>
    );
}
