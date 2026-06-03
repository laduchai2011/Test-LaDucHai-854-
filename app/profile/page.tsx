"use client";
import { useState } from "react";
import BottomNav from "@/components/layout/BottomNav";
import Sidebar from "@/components/layout/Sidebar";
import { useResponsive } from "@/hooks/useResponsive";

export default function Profile() {
    const { isMobile } = useResponsive();
    const [isShowHeader, setIsShownHeader] = useState(true); 

    return (
        <div>
            {isMobile ? <BottomNav route="/profile" /> : <Sidebar route="/profile" isShowHeader={isShowHeader} setIsShownHeader={setIsShownHeader} />}
        </div>
    );
}