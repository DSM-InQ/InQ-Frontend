"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

interface PropsType {
    children: React.ReactNode;
}

export default function Provider({ children }: PropsType) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                keepPreviousData: true,
                refetchOnWindowFocus: true,
                refetchOnMount: true,
                staleTime: 5000,
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
