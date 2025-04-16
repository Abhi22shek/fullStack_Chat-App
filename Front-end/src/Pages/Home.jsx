import React, { useEffect } from 'react'
import NochatSelected from '../Component/NochatSelected'
import ChatContainer from '../Component/ChatContainer'
import SideBar from '../Component/SideBar'
import { useUserAuthStore } from '../Store/userAuthStore'
import { useChatStore } from '../Store/useChatStore'

const Home = () => {
  const {selectedUser,setupSocketListener} = useChatStore()
  const { socket} = useUserAuthStore();

useEffect(() => {
  if(socket){
     const cleaup =  setupSocketListener();
     return cleaup;
  }
}, [socket,setupSocketListener])
  return (
    
    <div className='h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <SideBar/>

            {selectedUser ? <ChatContainer/> : <NochatSelected/>}
          </div>
        </div>
      </div>

    </div>
    
  )
}

export default Home