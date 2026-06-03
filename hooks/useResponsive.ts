"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
    window.addEventListener("resize", callback);

    return () => {
        window.removeEventListener("resize", callback);
    };
}

function getSnapshot() {
    return window.innerWidth;
}

function getServerSnapshot() {
    return 1024;
}

export function useResponsive() {
    const width = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    );

    return {
        width,
        isMobile: width <= 768,
        isTablet: width > 768 && width <= 1024,
        isDesktop: width > 1024,
    };
}