"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

interface PropsType {
    children: React.ReactNode;
}

/** 쉽게 react의 index.tsx나 app.tsx라고 생각하면 됨 */
export default function Provider({ children }: PropsType) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                keepPreviousData: true,
                refetchOnWindowFocus: true,
                refetchOnMount: true,
                staleTime: 60000,
                retry: 1,
            },
        },
    });
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );
}
