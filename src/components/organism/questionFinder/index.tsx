"use client";
import React from "react";
import { Category } from "@/components/element/questionFinder/category";
import styled from "styled-components";
import QuestionList from "@/components/element/questionFinder/questionList";

/** @returns 질문 검색 page */
export default function QuestionFinder() {
    return (
        <Container>
            <Category />
            <QuestionList />
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    gap: 59px;
    margin-top: 170px;
`;
