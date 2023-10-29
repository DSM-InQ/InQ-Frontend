import "@/styles/globals.css";
import { Noto_Sans_KR } from "next/font/google";
import React from "react";
import { Metadata } from "next";
import Provider from "@/components/provider";
import StyledComponentsRegistry from "@/lib/registry";

/** 글자 폰트 스타일 */
const notoSans = Noto_Sans_KR({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

/** 프로젝트 metadata 설정 */
export const metadata: Metadata = {
    title: "InQ",
    description:
        "대덕소프트웨어마이스터고등학교 2학년 학생들이 면접질문을 연습할 수 있도록 만든 서비스입니다.",
};

/**
 * @returns 공통으로 들어갈 부분 설정
 */
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body className={notoSans.className}>
                <StyledComponentsRegistry>
                    <Provider>{children}</Provider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
