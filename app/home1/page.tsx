"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";
import Sidebar from "@/components/layout/Sidebar";
import BottomNav from "@/components/layout/BottomNav";
import VideoBox from "@/app/home1/component/VideoBox";
import { useResponsive } from "@/hooks/useResponsive";
import { PostField } from "@/type/post";
import { fetcher } from "@/utils/fetcher";


export default function Home1() {
    const { isMobile } = useResponsive();
    const [isShowHeader, setIsShownHeader] = useState(true); 
    const listRef = useRef<HTMLDivElement>(null);
    const [posts, setPosts] = useState<PostField[]>([]);

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

    useEffect(() => {
        fetcher<PostField[]>("/api/posts")
        .then((res) => {
            // setPosts((prev) => [...prev, ...(res || [])])
            setPosts(res)
        })
        .catch(err => {
            console.error(err)
        })
    }, [])

    const list_post = posts.map((item) => (
        <div key={item.id}> 
            <VideoBox data={item} />
        </div>
    ))


    return (
        <div className={styles.parent}>
            {isMobile ? <BottomNav route="/" /> : <Sidebar route="/" isShowHeader={isShowHeader} setIsShownHeader={setIsShownHeader} />}
            <div className={styles.list} ref={listRef}>
                <div>
                   {list_post}
                </div>
            </div>
        </div>
    );
}
