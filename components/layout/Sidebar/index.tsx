"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { X, Menu, House, UserPen, Telescope } from "lucide-react";
import { useResponsive } from "@/hooks/useResponsive";

export default function Sidebar({route, isShowHeader, setIsShownHeader}: {route: string, isShowHeader: boolean, setIsShownHeader: React.Dispatch<React.SetStateAction<boolean>>}) {
    const router = useRouter();
    const { isMobile } = useResponsive();
    const [isShowText, setIsShowText] = useState(true);
    const parentRef = useRef<HTMLDivElement>(null);
    const openRef = useRef<SVGSVGElement>(null);
    const closeRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!parentRef.current) return;
        if (!openRef.current) return;
        if (!closeRef.current) return;

        const parent_ref = parentRef.current;
        const open_ref = openRef.current;
        const close_ref = closeRef.current;

        if (isShowHeader) {
            parent_ref.classList.remove(styles.hidden);
            open_ref.classList.remove(styles.opacity);
            setTimeout(() => {
                open_ref.classList.add(styles.hidden);
                close_ref.classList.remove(styles.hidden);
                close_ref.classList.add(styles.opacity);
                setIsShowText(true);
            }, 150)
        } else {
            parent_ref.classList.add(styles.hidden);
            close_ref.classList.remove(styles.opacity);
            setTimeout(() => {
                close_ref.classList.add(styles.hidden);
                open_ref.classList.remove(styles.hidden);
                open_ref.classList.add(styles.opacity);
                setIsShowText(false);
            }, 150)
        }
    }, [isShowHeader])

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        if (isMobile) {
            setIsShownHeader(false);
        }
    }, [isMobile, setIsShownHeader]);

    const handleClose = () => {
        setIsShownHeader(false)
    }

    const handleOpen = () => {
        // if (isMobile) return;
        setIsShownHeader(true)
    }

    const handleGoToScreen = (path: string) => {
        router.push(path);
    }

    const handleSelected = (_route: string) => {
        if (route === _route) {
            return styles.selected;
        }         
        return '';
    }

    return (
        <div className={styles.parent} ref={parentRef}>
            <div className={styles.header}>
                <X className={`${styles.opacity}`} onClick={() =>handleClose()} ref={closeRef} size={24}/>
                <Menu className={`${styles.hidden}`} onClick={() =>handleOpen()} ref={openRef} size={24}/>
            </div>
           <div className={`${styles.row} ${handleSelected('/')}`}>
                <div onClick={() => handleGoToScreen('/')}> 
                    <div> 
                        <House size={20}/>
                    </div>
                    {isShowText && <div>
                        <span>Trang chủ</span>
                    </div>}
                </div>
            </div>
            <div className={`${styles.row} ${handleSelected('/discover')}`}>
                <div onClick={() => handleGoToScreen('/discover')}> 
                    <div>
                        <Telescope size={20}/>
                    </div>
                    {isShowText && <div>
                        <span>Khám phá</span>
                    </div>}
                </div>
            </div>
            <div className={`${styles.row} ${handleSelected('/profile')}`}>
                <div onClick={() => handleGoToScreen('/profile')}> 
                    <div>
                        <UserPen size={20}/>
                    </div>
                    {isShowText && <div>
                        <span>Trang cá nhân</span>
                    </div>}
                </div>
            </div>
        </div>
    );
}