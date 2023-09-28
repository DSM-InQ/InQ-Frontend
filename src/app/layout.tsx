"use client";
import "@/styles/globals.css";
import { Noto_Sans_KR } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const notoSans = Noto_Sans_KR({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: 0 },
    },
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <head>
                <title>InQ</title>
                <link rel="icon" href="./favicon.ico" />
                <meta
                    name="description"
                    content="대덕소프트웨어마이스터고등학교 2학년 학생들이 면접질문을 연습할 수 있도록 만든 서비스입니다."
                />
            </head>
            <body className={notoSans.className}>
                <QueryClientProvider client={queryClient}>
                    {children}
                    <ReactQueryDevtools initialIsOpen={true} />
                </QueryClientProvider>
            </body>
        </html>
    );
}
