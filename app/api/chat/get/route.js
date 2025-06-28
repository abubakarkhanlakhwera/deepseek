import connectDB from "@/config/db";
import Chat from "@/models/chat";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";


export async function GET(req) {
    try{
        const {userId} = getAuth(req);
        if(!userId){
            return NextResponse.json({
                success:false,
                message:"User not authenticated",
            });
        }
        // Connect to the database and fetch all chat from user
        await connectDB();
        const data = await Chat.find({userId});
        return NextResponse.json({success:true,data})
     }catch(e){
            return NextResponse.json({
                success:false,error:error.message
            });
        }
}