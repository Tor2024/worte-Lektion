"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    const convex = useMemo(() => {
        return convexUrl ? new ConvexReactClient(convexUrl) : null;
    }, []);

    if (!convex) {
        // В режиме билда (SSR) или если переменная не задана, просто рендерим детей.
        // Это предотвращает ошибку "No address provided to ConvexReactClient".
        if (typeof window !== "undefined" && !convexUrl) {
            console.warn("Convex: NEXT_PUBLIC_CONVEX_URL is not defined.");
        }
        return <>{children}</>;
    }

    return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
