import Header from "@/components/organism/header";
import QuestionFinder from "@/components/organism/questionFinder";
import React from "react";

/**
 * @returns 메인 페이지
 */
export default function Home() {
    return (
        <>
            <Header />
            <QuestionFinder />
        </>
    );
}
