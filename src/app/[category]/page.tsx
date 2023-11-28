import Header from '@/components/organism/header';
import RandomQuestionCompo from '@/components/organism/randomQuestion';
import React from 'react';

export default function RandomQuestionPage({ params }: { params: { category: string } }) {
    return (
        <>
            <Header />
            <RandomQuestionCompo category={params.category} />
        </>
    );
}
