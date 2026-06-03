"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";
import Sidebar from "@/components/layout/Sidebar";
import VideoBox from "@/app/home1/component/VideoBox";
import { useResponsive } from "@/hooks/useResponsive";


export default function Home1() {
    const { isMobile } = useResponsive();
    const [isShowHeader, setIsShownHeader] = useState(true); 
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!listRef.current) return;

        const list_ref = listRef.current;

        if (isMobile) {
            list_ref.classList.add(styles.hidden);
        } else {
            if (isShowHeader) {
            list_ref.classList.remove(styles.hidden);
            
            } else {
                list_ref.classList.add(styles.hidden);
            }
        }
    }, [isShowHeader, isMobile])

    const srcs = [
        'https://f141-zvc.dlmd.me/6cba3a5a62168e48d707/3279710436711330866',
        'https://f143-zvc.dlmd.me/a2271dc7458ba9d5f09a/5384650480390444142',
        'https://f143-zvc.dlmd.me/e55052b69bfb77a52eea/2999570761102491377',
        'https://f141-zvc.dlmd.me/0c2d4cca1486f8d8a197/8533200668491180544'
    ]

    return (
        <div className={styles.parent}>
            <Sidebar route="/" isShowHeader={isShowHeader} setIsShownHeader={setIsShownHeader} />
            <div className={styles.list} ref={listRef}>
                <div>
                    <div> 
                        <VideoBox index={0} src={srcs[0]} />
                    </div>
                    <div> 
                        <VideoBox index={1} src={srcs[1]} />
                    </div>
                    <div> 
                        <VideoBox index={2} src={srcs[2]} />
                    </div>
                    <div> 
                        <VideoBox index={3} src={srcs[3]} />
                    </div>
                </div>
            </div>
        </div>
    );
}
