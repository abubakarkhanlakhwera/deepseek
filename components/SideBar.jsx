import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'
import { useClerk,UserButton } from '@clerk/nextjs'
import { useAppContext } from '@/context/AppContext'
import ChatLabel from './ChatLabel'

function SideBar({ expand, setExpand }) {
  const {openSignIn} = useClerk()
  const {user} = useAppContext()
  const [openMenu,setOpenMenu] = useState({id:0,open:false})

  return (
    <div className={`flex flex-col justify-between bg-[#212327] pt-7 transition-all z-50 max-md:absolute h-screen ${expand ? 'p-4 w-64' : 'md:w-20 w-0 max-md:overflow-hidden'}`}>
      <div>
        {/* Logo + Sidebar Toggle */}
        <div className={`flex ${expand ? 'flex-row gap-10' : 'flex-col items-center gap-8'}`}>
          <Image className={expand ? 'w-36' : 'w-10'} src={expand ? assets.logo_text : assets.logo_icon} alt='Logo' />

          <div
            className='group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer'
            onClick={() => setExpand(!expand)}
          >
            <Image src={assets.menu_icon} alt='Menu Icon (Mobile)' className='md:hidden' />
            <Image src={expand ? assets.sidebar_close_icon : assets.sidebar_icon} alt='Sidebar Toggle Icon' className='hidden md:block w-7' />

            <div className={`absolute w-max ${expand ? 'left-1/2 -translate-x-1/2 top-12' : '-top-12 left-0'} opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none`}>
              {expand ? 'Close sidebar' : 'Open sidebar'}
              <div className={`w-3 h-3 absolute bg-black rotate-45 ${expand ? 'left-1/2 -top-1.5 -translate-x-1/2' : 'left-4 -bottom-1.5'}`} />
            </div>
          </div>
        </div>

        {/* New Chat Button */}
        <button className={`mt-8 flex items-center justify-center cursor-pointer ${expand ? "bg-primary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max" : "group relative h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg"}`}>
          <Image className={expand ? "w-6" : "w-7"} alt='New Chat Icon' src={expand ? assets.chat_icon : assets.chat_icon_dull} />
          <div className='absolute w-max -top-12 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none'>
            New Chat
            <div className='w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5'></div>
          </div>
          {expand && <p className='text-white font-medium'>New Chat</p>}
        </button>

        {/* Recents Label */}
        <div className={`mt-8 text-white/25 text-sm ${expand ? "block" : "hidden"}`}>
          <p className='my-1'>Recents</p>
          {/* chatLabel */}
          <ChatLabel openMenu={openMenu} setOpenMenu={setOpenMenu} />
        </div>
      </div>

      {/* Bottom Section: App QR + Profile */}
      <div>
        {/* Get App Button (with QR code) */}
        <div className={`flex items-center cursor-pointer group relative ${expand ? "gap-1 text-white/80 text-sm p-2.5 border border-primary rounded-lg hover:bg-white/10" : "h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg"}`}>
          <Image className={expand ? "w-5" : "w-6.5 mx-auto"} alt='Phone Icon' src={expand ? assets.phone_icon : assets.phone_icon_dull} />

          {/* Tooltip with QR code */}
          <div className={`absolute pb-8 ${!expand ? "-right-40" : "left-1/2 -translate-x-1/2"} -top-60 opacity-0 group-hover:opacity-100 group-hover:block transition-all duration-300 z-50`}>
            <div className='relative w-max bg-black text-white text-sm p-3 rounded-lg shadow-lg'>
              <Image className='w-44' alt='QR Code' src={assets.qrcode} />
              <p className='mt-2'>Scan to get DeepSeek App</p>
              <div className={`w-3 h-3 absolute bg-black rotate-45 ${expand ? "right-1/2 translate-x-1/2" : "left-4"} -bottom-1.5`} />
            </div>
          </div>

          {expand && (
            <>
              <span>Get App</span>
              <Image alt='New Icon' src={assets.new_icon} />
            </>
          )}
        </div>

        {/* My Profile */}
        <div onClick={user? null:openSignIn} className={`flex items-center ${expand ? "hover:bg-white/10 rounded-lg" : "justify-center w-full"} gap-3 text-white/60 text-sm p-2 mt-2 cursor-pointer`}>
        {
          user?<UserButton/>
          : <Image alt='Profile Icon' src={assets.profile_icon} className='w-7' />
        }
          
          {expand && <span>My Profile</span>}
        </div>
      </div>
    </div>
  )
}

export default SideBar
