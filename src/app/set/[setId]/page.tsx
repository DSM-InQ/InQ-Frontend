import React from "react";
import Header from "@/components/organism/header";
import QuestionSetDetail from "@/components/organism/questionSetDetail";

export default function QuestionSetDetailPage({
    params,
}: {
    params: { setId: string };
}) {
    return (
        <>
            <Header />
            <QuestionSetDetail setId={params.setId} />
        </>
    );
}
