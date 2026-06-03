"use client";
import { useState } from "react";
import BottomNav from "@/components/layout/BottomNav";
import Sidebar from "@/components/layout/Sidebar";
import { useResponsive } from "@/hooks/useResponsive";

export default function Discover() {
    const { isMobile } = useResponsive();
    const [isShowHeader, setIsShownHeader] = useState(true);

    return (
        <div>
            {isMobile ? <BottomNav route="/discover" /> : <Sidebar route="/discover" isShowHeader={isShowHeader} setIsShownHeader={setIsShownHeader} />}
        </div>
    );
}