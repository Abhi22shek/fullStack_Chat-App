import React, { useEffect, useRef } from 'react'
import ChatHeader from './ChatHeader.jsx'
import MessageInput from './MessageInput.jsx'
import MessageSkeleton from './skeletons/MessageSkeleton.jsx'
import { useUserAuthStore } from '../Store/userAuthStore.js'
import { formatMessageTime } from '../lib/utils.js'
import { FileIcon, defaultStyles } from 'react-file-icon';
import { useChatStore } from '../Store/useChatStore.js'

const ChatContainer = () => {
  const {getMessages, messages, isMessagesLoading, selectedUser} = useChatStore()
  const {authUser} = useUserAuthStore()
  const messageendref = useRef(null)

  useEffect(() => {
    // Only call getMessages if selectedUser and selectedUser._id exist
    if (selectedUser && selectedUser._id) {
      getMessages(selectedUser._id)
    }
  }, [selectedUser, getMessages])

  useEffect(() => {
    if(messageendref.current){
      messageendref.current.scrollIntoView({behavior: 'smooth'})
    }
  }, [messages])

  // Show a message if no user is selected
  if (!selectedUser || !selectedUser._id) return <div>Please select a user to start chatting</div>

  if(isMessagesLoading){
    return (
      <div className='flex-1 flex overflow-auto flex-col'>
      <ChatHeader/>
      <MessageSkeleton/>
      <MessageInput/>
     </div>
    )
  }
  
  return (
    <div className='flex-1 flex flex-col justify-between h-full overflow-hidden'>
      <ChatHeader/>

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message) => (
          <div 
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageendref}
            >
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img 
                src={message.senderId === authUser._id ? authUser.profilePicture || "/avatar.png" : selectedUser.profilePicture || "/avatar.png"} 
                alt='profilePicture'
                 />
              </div>
            </div>

            <div className='chat-header'>
              <time className='text-xs opacity-50 ml-1'>
                {formatMessageTime(message.createdAt)}
              </time>

              <div className='chat-bubble max-w-xs '>
                {message.image && (
                  <img
                    src={message.image}
                    alt='attachment'
                    className='sm:max-w-[200px] rounded-md mb-2' 
                  />
                )}
                {message.file && message.file.url && (
                  <a 
                  href={message.file.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className="mt-2 flex items-center p-2 bg-base-300/50 rounded-lg hover:bg-base-300"
                  >
                    <div className='size-8 mr-2'>
                      <FileIcon
                        extension={message.file.name?.split('.').pop() || ''}
                        {...defaultStyles[message.file.name?.split('.').pop() || '']}
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium truncate'>
                        {message.file.name || 'File'}
                      </p>
                      <p className='text-xs opacity-70'>
                        {message.file.size ? `${(message.file.size/1024).toFixed(1)} KB` : ''}
                      </p>
                    </div>
                  </a>
                )}
                {message.text && <p>{message.text}</p>}   
              </div>
            </div>
          </div>
        ))}
      </div>

      <MessageInput/>
    </div>
  )
}

export default ChatContainer