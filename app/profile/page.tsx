"use client";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function Profile() {
    const [isShowHeader, setIsShownHeader] = useState(true); 

    return (
        <div>
            <Sidebar route="/profile" isShowHeader={isShowHeader} setIsShownHeader={setIsShownHeader} />
        </div>
    );
}