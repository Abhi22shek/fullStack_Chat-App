import React from 'react'
import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import { useUserAuthStore } from './userAuthStore'
import { toast } from 'react-hot-toast'


export const useChatStore = create((set,get) => ({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    newMessageAlert: null,

    getUsers: async() => {
        set({isUsersLoading:true})
        try {
            const res = await axiosInstance.get('/messages/users')
            set({users:res.data})
            
        } catch (error) {
            return toast.error(error.response.data.message)
        }finally{
            set({isUsersLoading:false})
        }
    },

    getMessages:async(userId) =>{
        set({isMessagesLoading:true})
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({messages:res.data})
            
        } catch (error) {
            return toast.error(error.response.data.message)
        }finally{
            set({isMessagesLoading:false})
        }
    },
    
    sendMessages: async (formData) => {
      const { selectedUser, messages} = get();
      
      if (!selectedUser?._id) {
          return toast.error("No user selected");
      }

      try {
          const res = await axiosInstance.post(
              `/messages/send/${selectedUser._id}`, 
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
          );
      
          if (!res.data) {
              throw new Error('No response from server');
          }
          set({ messages: [...messages, res.data] });

          const socket = useUserAuthStore.getState().socket;
          if (socket) {
              socket.emit("new message", res.data);
          }
          
      } catch (error) {
          console.error('Send message error:', error);
          toast.error(error.response?.data?.message || "Failed to send message");
          throw error;
      }
    },
    
    setSelectedUser:(user) => {
        set({selectedUser: user})
    },


    setupSocketListener: () => {
        const socket = useUserAuthStore.getState().socket;
        if(!socket) return;
    
        // Make sure we're listening for the correct event
        socket.on('message received', (message) => {
            console.log("Message received in frontend:", message);
            get().addNewMessage(message);
        });
    
        return () => {
            socket.off('message received');
        };
    },

    addNewMessage: (message) => {
        const {messages, selectedUser} = get();
        console.log("Adding new message:", message);
        console.log("Current selected user:", selectedUser);
    
        if(selectedUser && (message.senderId === selectedUser._id || message.receiverId === selectedUser._id)){
            console.log("Updating messages for current chat");
            set({messages: [...messages, message]});
        } else {
            console.log("Setting message alert for non-active chat");
            set({newMessageAlert: message});
        }
    }
}))