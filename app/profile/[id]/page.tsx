"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./styles.module.css";
import { useParams } from "next/navigation";
import Image from "next/image";
import BottomNav from "@/components/layout/BottomNav";
import Sidebar from "@/components/layout/Sidebar";
import { useResponsive } from "@/hooks/useResponsive";
import { fetcher } from "@/utils/fetcher";
import { UserField } from "@/type/user";

export default function Profile() {
    const params = useParams();
    const id = params.id as string;
    const { isMobile } = useResponsive();
    const mainRef = useRef<HTMLDivElement>(null);
    const [isShowHeader, setIsShownHeader] = useState(true); 
    const [user, setUser] = useState<UserField | null>(null)

    const avatarnull = 'https://www.shutterstock.com/image-vector/default-avatar-social-media-display-600nw-2632690107.jpg';

    useEffect(() => {
        if (!mainRef.current) return;

        const main_ref = mainRef.current;

        if (isMobile) {
            main_ref.classList.add(styles.hidden);
        } else {
            if (isShowHeader) {
            main_ref.classList.remove(styles.hidden);
            
            } else {
                main_ref.classList.add(styles.hidden);
            }
        }
    }, [isShowHeader, isMobile])

    useEffect(() => {
        if (id === '0') return
        fetcher<UserField>(`/api/user?id=${id}`)
        .then((res) => {
            setUser(res)
        })
        .catch(err => {
            console.error(err)
        })
    }, [id])

    return (
        <div>
            {isMobile ? <BottomNav route="/profile" /> : <Sidebar route="/profile" isShowHeader={isShowHeader} setIsShownHeader={setIsShownHeader} />}
            <div className={styles.main} ref={mainRef}>
                {id !== '0' ? <div>
                        <Image 
                            className={styles.avatar} 
                            src={user?.avatar ? user.avatar : avatarnull} 
                            width={40}
                            height={40}
                            alt='avatar' 
                        />
                        <div className={styles.name}>{user?.name}</div>
                    </div> : 
                    <div>Bạn chưa đăng nhập</div>
                }
            </div>
        </div>
    );
}