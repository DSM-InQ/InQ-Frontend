import React from "react";
import Header from "@/components/organism/header";
import QuestionSetDetail from "@/components/organism/questionSetDetail";

export default function QuestionSetDetailPage({
    params,
}: {
    params: { id: string };
}) {
    return (
        <>
            <Header />
            <QuestionSetDetail id={params.id} />
        </>
    );
}
