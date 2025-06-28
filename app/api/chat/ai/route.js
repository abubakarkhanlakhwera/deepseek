export const maxDuration=60;
import connectDB from "@/config/db";
import Chat from "@/models/chat";
import { getAuth } from "@clerk/nextjs/server";
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req){
    try{
        const {userId}=getAuth(req)
        //Extract chatId and prompt from the request body
        const {chatId,prompt} = await req.json();

        if(!userId){
            return NextResponse.json({success:false,message:"User not authenticated",});
        }
        // Find the chat document in the database based on userId and chatId
        await connectDB();
        const data=await Chat.findone({userId,_id:chatId})
        // create a user message object
        const userPrompt = {
            role: "user",
            content: prompt,
            timestamp:Date.now()
        };
        data.messages.push(userPrompt);
        //call groq api 
        const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{role:"user",content:prompt}],
      store: true,
    });
    const message = completion.choices[0].message;
    message.timestamp = Date.now();
    data.messages.push(message);
    data.save();
    return NextResponse.json({success:true,data:message})
    }catch(error){
        return NextResponse.json({success:false,error:error.message});

    }
}