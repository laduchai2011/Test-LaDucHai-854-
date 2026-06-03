

## iải thích ngắn gọn cách xử lý logic Play/Pause khi cuộn trang

```bash
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
}, []);
```
IntersectionObserver sẽ theo dõi thẻ được truyền vào qua observer.observe();
threshold: 0.7, tức là component hiển thị được 70% viewport
viewport không truyền mặc định là cửa sổ trình duyệt, nếu cần theo viewport chỉ định, cần truyền vào root ( root?: Element | Document | null | undefined;)
Vì video hiển trị toàn bộ chiều cao màn hình nên viewport được để mặc định
entry.isIntersecting là giá trị trả về là true khi component trong viewport, false khi nằm ngoài viewport
Và chúng unmount cần phải observer.disconnect() để đảm bảo hiệu suất

Ví dụ về 1 component Lazy video của tôi:
```bash
import { useEffect, useRef, useState, memo } from 'react';
import style from './style.module.scss';
import { LazyVideoProps } from './type';
import Skeleton from '@src/component/Skeleton';

const LazyVideo = ({ lock_auto_play_with_scroll_snap, src, className, root }: LazyVideoProps) => {
    const parent_element = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [loading, setLoading] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        if (!parent_element.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setLoading(true);

                    const timeout = setTimeout(() => {
                        setLoading(false);
                        clearTimeout(timeout);
                    }, 0);

                    observer.disconnect();
                }
            },
            {
                root: root,
            }
        );

        observer.observe(parent_element.current);

        return () => observer.disconnect();
    }, [root]);

    useEffect(() => {
        if (loading !== false) return;

        if (!videoRef.current) return;

        if (lock_auto_play_with_scroll_snap) return;

        // let isPlay: boolean = false;

        const observer_play = new IntersectionObserver(
            ([entry]) => {
                // if (entry.isIntersecting) {
                //     if (!isPlay) {
                //         videoRef.current?.play();
                //         isPlay = true;
                //     }
                // } else {
                //     if (isPlay) {
                //         videoRef.current?.pause();
                //         isPlay = false;
                //     }
                // }
                if (entry.isIntersecting) {
                    // videoRef.current?.play();
                } else {
                    // videoRef.current?.pause();
                }
            },
            {
                root: root,
            }
        );

        observer_play.observe(videoRef.current);

        return () => observer_play.disconnect();
    }, [root, loading, lock_auto_play_with_scroll_snap]);

    return (
        <div className={`${style.parent} ${className || ''}`} ref={parent_element}>
            {loading === true && <Skeleton />}
            {loading === false && <video className={style.video} ref={videoRef} src={src} controls />}
        </div>
    );
};

export default memo(LazyVideo);
```