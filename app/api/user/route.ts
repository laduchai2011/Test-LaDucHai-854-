import { NextResponse, NextRequest } from "next/server";
import { UserField } from "@/type/user";

const users: UserField[] = [
    { 
        id: 1, 
        name: "Nguyen A", 
        avatar: 'https://api.5kaquarium.com/service_image_v1/query/image/1778912326350_1_133840412595749052.jpg' 
    },
    { 
        id: 2, 
        name: "Tran B",
        avatar: 'https://s120-ava-talk.zadn.vn/d/c/6/5/6/120/49346e2f63e621f67751548e8810212d.jpg'  
    },
];

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id") || "";

    const user = users.filter(user => user.id === Number(id));

    return NextResponse.json(user[0]);
}