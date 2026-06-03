"use client";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function discover() {
    const [isShowHeader, setIsShownHeader] = useState(true);

    return (
        <div>
            <Sidebar route="/discover" isShowHeader={isShowHeader} setIsShownHeader={setIsShownHeader} />
        </div>
    );
}