"use client";
import React from "react";
import { Stack } from "@/components/designSystem/common/stack";
import { useMyInfoSideBar } from "@/store/questionState";
import { MyQuestion } from "@/components/element/myInfo/myQuestion";
import { MyQuestionSet } from "@/components/element/myInfo/myQuestionSet";
import { FavoriteQuestionSet } from "@/components/element/myInfo/favoriteQuestionSet";
import { FavoriteQuestion } from "@/components/element/myInfo/favoriteQuestion";
import { MyAnswer } from "@/components/element/myInfo/myAnswer";
import { Info } from "@/components/element/myInfo/info";
import { SideBar } from "@/components/element/myInfo/sideBar";
import MyInfoChangeCompo from "@/components/element/myInfo/myInfoChangeCompo";

/** @returns 유저정보 조회 components */
export default function MyInfoCompo() {
    const { sideBarType } = useMyInfoSideBar();

    const components = () => {
        switch (sideBarType) {
            case "myInfo":
                return <Info />;
            case "myInfoChange":
                return <MyInfoChangeCompo />;
            case "answerHistory":
                return <MyAnswer />;
            case "myQuestion":
                return <MyQuestion />;
            case "mySet":
                return <MyQuestionSet />;
            case "myFavoriteQuestion":
                return <FavoriteQuestion />;
            case "myFavoriteSet":
                return <FavoriteQuestionSet />;
        }
    };
    return (
        <Stack width="100vw" justify="center" align="center">
            <Stack padding="100px 0" gap={40}>
                <>
                    <SideBar />
                    {components()}
                </>
            </Stack>
        </Stack>
    );
}
