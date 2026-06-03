"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, House, UserPen, Telescope } from "lucide-react";

export default function BottomNav({route}: {route: string }) {
    const router = useRouter();
    const parentRef = useRef<HTMLDivElement>(null);
    const [isShow, setIshow] = useState<boolean>(false);


    useEffect(() => {
        const parent_ref = parentRef.current;
        if (!parent_ref) return;

        if (isShow) {
            parent_ref.classList.add(styles.show);
        } else {
            parent_ref.classList.remove(styles.show);
        }
    }, [isShow])

    const handleShowUp = () => {
        setIshow(true)
    }

    const handleShowDown = () => {
        setIshow(false)
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
        <div className={styles.parent}>
            <div className={styles.listContainer}>
                <div className={styles.icons}>
                    {!isShow && <ChevronUp onClick={() => handleShowUp()} size={20} />}
                    {isShow && <ChevronDown onClick={() => handleShowDown()} size={20} />}
                </div>
                <div className={styles.list} ref={parentRef}>
                    <div>
                        <div className={`${styles.box} ${handleSelected('/')}`} onClick={() => handleGoToScreen('/')}>
                            <House size={20}/>
                        </div>
                        <div className={`${styles.box} ${handleSelected('/discover')}`} onClick={() => handleGoToScreen('/discover')}>
                            <Telescope size={20}/>
                        </div>
                        <div className={`${styles.box} ${handleSelected('/profile')}`} onClick={() => handleGoToScreen('/profile')}>
                            <UserPen size={20}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.main}>
                <div className={`${styles.box} ${handleSelected('/')}`} onClick={() => handleGoToScreen('/')}>
                    <House size={20}/>
                </div>
                <div className={`${styles.box} ${handleSelected('/discover')}`} onClick={() => handleGoToScreen('/discover')}>
                    <Telescope size={20}/>
                </div>
                <div className={`${styles.box} ${handleSelected('/profile')}`} onClick={() => handleGoToScreen('/profile')}>
                    <UserPen size={20}/>
                </div>
            </div>
        </div>
    );
}