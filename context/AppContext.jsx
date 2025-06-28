"use client";

import Chat from "@/models/chat";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import  { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = ()=>{
    return useContext(AppContext)
}
export const AppContextProvider = ({children})=>{
    const {user} = useUser()
    const {getToken} = useAuth()
    const [Chat,setChats] = useState([]);
    const [selectedChat,setSelectedChat] = useState(null);
    const createNewChat = async()=>{
        try{
            if(!user) return null;
            const token = await getToken();
            await axios.post('/api/chat/create',{},{headers:{
                Authrization:`Bearer ${token}`
            }})
            fetchUsersChats();
        }catch(error){
            toast.error(error.message)
        }
    }
    const fetchUsersChats = async()=>{
        try{
            const token = await getToken();
             const {data} =  await axios.post('/api/chat/get',{},{headers:{
                Authrization:`Bearer ${token}`
            }})
            if(data.success){
                console.log(data.data)
                setChats(data.data)
                // If the user has no chats, create one
                if(data.data.length ===0){
                    await createNewChat();
                    return fetchUsersChats();
                }else{
                    // sort the chats accoding to updated date
                    data.data.sort((a,b)=> new Date(b.updateAt)-new Date(a.updateAt));
                    // set recently updated chat as selected chat
                    setSelectedChat(data.data[0]);
                    console.log(data.data[0])
                }
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }
    const Value = {
        user
    }
useEffect(()=>{
    fetchUsersChats();
},[user])
    const value = {
        user,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        fetchUsersChats,
        createNewChat
    }
    return <AppContext.Provider value={value} >{children}</AppContext.Provider>
}