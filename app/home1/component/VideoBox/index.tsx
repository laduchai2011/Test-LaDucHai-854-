"use client";
import { memo, useRef, useEffect, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { Heart, MessageCircleMore, Share2, Volume1, Volume2, VolumeOff } from "lucide-react";


function VideoBox({index, src}: {index: number, src: string}) {
    const url = src;
    const parentRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [volumeCount, setVolumeCount] = useState(0);
    const processContainerRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);
    const [heartCount, setHeartCount] = useState(0);
    const [isHearted, setIsHearted] = useState(false);
    const [messageCount, setMessageCount] = useState(0);
    const [shareCount, setShareCount] = useState(0);
    const desRef = useRef<HTMLDivElement>(null);
    const [textSeeMore, setTextSeeMore] = useState<string | null>(null)

    const avatarnull = 'https://www.shutterstock.com/image-vector/default-avatar-social-media-display-600nw-2632690107.jpg';

    useEffect(() => {
        if (!parentRef.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                videoRef.current?.play();
            } else {
                videoRef.current?.pause();
            }
        }, {
            threshold: 0.7
        });

        observer.observe(parentRef.current);

        return () => observer.disconnect();
    }, [index]);

    const handleMaxVolume = () => {
        setVolumeCount(100)
    }

    const handleMinVolume = () => {
        setVolumeCount(0)
    }

    useEffect(() => {
        if (!processRef.current) return;
        if (!videoRef.current) return;
        const process_ref = processRef.current;
        const video_ref = videoRef.current;
        if (volumeCount === 0) {
            video_ref.muted = true;
        } else {
            video_ref.muted = false;
        }
        process_ref.style.width = `${volumeCount}px`;
        video_ref.volume = volumeCount / 100;
    }, [volumeCount]);

    const startX = useRef(0);
    const startWidth = useRef(0);
    const handleMouseDown = (e: React.MouseEvent) => {
        startX.current = e.clientX;
        startWidth.current = volumeCount;

        const handleMouseMove = (e: MouseEvent) => {
            const delta = e.clientX - startX.current;
            setVolumeCount(Math.max(0, Math.min(100, startWidth.current + delta)));
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseInVolumne = () => {
        if (!processContainerRef.current) return;
        processContainerRef.current.style.width = "100px";
    }

    const handleMouseOutVolumne = () => {
        if (!processContainerRef.current) return;
        processContainerRef.current.style.width = "0px";
    }

    const handleClickHeart = () => {
        if (isHearted) {
            setHeartCount((prevCount) => prevCount - 1);
            setIsHearted(false);
            return;
        }
        setHeartCount((prevCount) => prevCount + 1);
        setIsHearted(true);
    }

    const handleSelecVolumn = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!processContainerRef.current) return;
        const rect = processContainerRef.current.getBoundingClientRect();
        // console.log(rect.left);   // vị trí mép trái
        // console.log(rect.right);  // vị trí mép phải
        // console.log(rect.width);  // chiều rộng
        // console.log(rect.x);      // tương đương left   
        setVolumeCount(e.clientX - rect.x)
    }

    const handleClickVideo = () => {
        const video = videoRef.current;
        if (!video) return;

        if (!video.paused) {
            video.pause();
        } else {
            video.play();
        }
    }

    useEffect(() => {
        const des_ref = desRef.current;
        if (!des_ref) return;

        const isClamped = des_ref.scrollHeight > des_ref.clientHeight;
        if (isClamped) {
            setTextSeeMore('Xem thêm')
        }
    }, []);

    const handleSeeMore = () => {
        const des_ref = desRef.current;
        if (!des_ref) return;

        if (textSeeMore === 'Xem thêm') {
            des_ref.classList.remove(styles.hidden);
            des_ref.classList.add(styles.show);
            setTextSeeMore('Ẩn')
        } 
        if (textSeeMore === 'Ẩn') {
            des_ref.classList.remove(styles.show);
            des_ref.classList.add(styles.hidden);
            setTextSeeMore('Xem thêm')     
        }
    }

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const currentTimeContainerRef = useRef<HTMLDivElement>(null);
    const currentTimeRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const video_ref = videoRef.current;
        if (!video_ref) return;

        const handleLoadedMetadata = () => {
            setDuration(video_ref.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(video_ref.currentTime);
        };

        video_ref.addEventListener("loadedmetadata", handleLoadedMetadata);
        video_ref.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            video_ref.removeEventListener("loadedmetadata", handleLoadedMetadata);
            video_ref.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, []);
    useEffect(() => {
        const currentTime_ref = currentTimeRef.current;
        if (!currentTime_ref) return;
        const currentWidth = 250 * (currentTime/duration);
        currentTime_ref.style.width = `${currentWidth}px`;
    }, [currentTime, duration])

    const handleSelecCurrentTime = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!currentTimeContainerRef.current) return;
        if (!videoRef.current) return;
        const rect = currentTimeContainerRef.current.getBoundingClientRect(); 
        const rate = (e.clientX - rect.x) / 250;
        setCurrentTime(rate * duration);
        videoRef.current.currentTime = rate * duration;
    }

    const handleTime = (t: number) => {
        const t1 = Math.floor(t / 60);
        const t2 = t % 60;
        return `${t1}:${Math.trunc(t2)}`
    }

    return (
        <div className={styles.parent} ref={parentRef}>
            <div className={styles.videoContainer}>
                <video
                    className={styles.video}
                    // controls
                    muted
                    loop
                    src={url}
                    ref={videoRef}
                    onClick={() => handleClickVideo()}
                />
                <div className={styles.interact1} onMouseEnter={() => handleMouseInVolumne()} onMouseLeave={() => handleMouseOutVolumne()}>
                    {volumeCount === 0 && <VolumeOff onClick={() => handleMaxVolume()} size={30} color="white" />}
                    {volumeCount > 0 && volumeCount < 100 && <Volume1 onClick={() => handleMinVolume()} size={30} color="white" />}
                    {volumeCount === 100 && <Volume2 onClick={() => handleMinVolume()} size={30} color="white" />}
                    <div ref={processContainerRef} onClick={(e) => handleSelecVolumn(e)}>
                        <div onMouseDown={handleMouseDown} ref={processRef} />
                    </div>
                </div>
                <div className={styles.interact2}>
                    <Image 
                        className={styles.avatar} 
                        src={avatarnull} 
                        width={40}
                        height={40}
                        alt='avatar' 
                    />
                    <div className={styles.heart}>
                        <Heart onClick={() => handleClickHeart()} size={30} color={isHearted ? "red" : "white"} />
                        <div>{heartCount}</div>
                    </div>
                    <div className={styles.message}>
                        <MessageCircleMore size={30} color="white" />
                        <div>{messageCount}</div>
                    </div>
                    <div className={styles.share}>
                        <Share2 size={30} color="white" />
                        <div>{shareCount}</div>
                    </div>
                </div>
                <div className={styles.content}>
                    <div>tac gia</div>
                    <div className={styles.hidden} ref={desRef}>
                        noi dung noi dung noi dung noi dung noi dung noi dung noi dungnoi dung noi dung noi dung noi dung noi dung noi dung noi dung noi dung noi dung noi dung noi dung noi dung noi dung noi dung noi dung noi dung noi dung
                        noi dung noi dung noi dung noi dung noi dung noi dung noi dungnoi dung noi dung noi dung noi dung noi dung noi dung noi dung noi dung noi dung noi dung noi dung noi dung noi dung noi dung noi dung noi dung noi dung
                    </div>
                    {textSeeMore && <div onClick={() => handleSeeMore()}>{textSeeMore}</div>}
                </div>
                <div className={styles.interact3}>
                    <div>
                        <div onClick={(e) => handleSelecCurrentTime(e)} ref={currentTimeContainerRef}>
                            <div ref={currentTimeRef} />
                        </div>
                        <div>{`${handleTime(currentTime)} / ${handleTime(duration)}`}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(VideoBox);