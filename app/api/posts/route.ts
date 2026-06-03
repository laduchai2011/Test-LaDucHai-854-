import { NextResponse } from "next/server";
import { PostField } from "@/type/post";

const posts: PostField[] = [
    { 
        id: 1, 
        des: "mieu ta 1: Con mèo là một loài động vật nhỏ, thuộc họ mèo, thường được nuôi làm thú cưng trong nhiều gia đình. Chúng có thân hình linh hoạt, đôi mắt to có thể nhìn tốt trong điều kiện ánh sáng yếu, và bộ ria mép giúp cảm nhận môi trường xung quanh. Mèo có nhiều giống khác nhau: có con lông ngắn, có con lông dài và rất bông xù. Màu lông cũng rất đa dạng như trắng, đen, vàng, xám hoặc pha trộn nhiều màu. Khi di chuyển, mèo rất nhẹ nhàng và nhanh nhẹn, có thể nhảy cao hoặc leo trèo dễ dàng", 
        url: 'https://f143-zvc.dlmd.me/a2271dc7458ba9d5f09a/5384650480390444142',
        likeCount: 10,
        commentCount: 16,
        shareCount: 22,
        userId: 1
    },
    { 
        id: 2, 
        des: "mieu ta 2", 
        url: 'https://f143-zvc.dlmd.me/a2271dc7458ba9d5f09a/5384650480390444142',
        likeCount: 2,
        commentCount: 14,
        shareCount: 26,
        userId: 2
    },
    { 
        id: 3, 
        des: "mieu ta 3", 
        url: 'https://f143-zvc.dlmd.me/e55052b69bfb77a52eea/2999570761102491377',
        likeCount: 5,
        commentCount: 7,
        shareCount: 92,
        userId: 1
    },
    { 
        id: 4, 
        des: "mieu ta 4", 
        url: 'https://f143-zvc.dlmd.me/e55052b69bfb77a52eea/2999570761102491377',
        likeCount: 11,
        commentCount: 169,
        shareCount: 23,
        userId: 2
    },
    { 
        id: 5, 
        des: "mieu ta 5", 
        url: 'https://f141-zvc.dlmd.me/0c2d4cca1486f8d8a197/8533200668491180544',
        likeCount: 17,
        commentCount: 18,
        shareCount: 25,
        userId: 1
    },
    { 
        id: 6, 
        des: "mieu ta 6", 
        url: 'https://f141-zvc.dlmd.me/0c2d4cca1486f8d8a197/8533200668491180544',
        likeCount: 18,
        commentCount: 222,
        shareCount: 111,
        userId: 2
    },
];

export async function GET() {
    return NextResponse.json(posts);
}