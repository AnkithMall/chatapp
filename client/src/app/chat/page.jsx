'use client'
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation'
import { io } from "socket.io-client";
import './Chat.css' ;
let socket;
const Chat = () => {
  const searchParams = useSearchParams();
  
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message,setMessage] = useState('') ;
  const [messages,setMessages] = useState([]) ;

  const ENDPOINT = process.env.SERVER || 'http://localhost:4000/';
  
  useEffect(() => {
    socket = io(ENDPOINT);
    const newName = searchParams.get('name');
    const newRoom = searchParams.get('room');
    console.log('New name:', newName);
    console.log('New room:', newRoom);
    
    setName(newName);
    setRoom(newRoom);
  
    socket.emit('join', { name: newName, room: newRoom }, () => {
      console.log('name,room -> ', newName, newRoom);
    });
  
    console.log('name,room -> ', newName, newRoom);
    console.log(socket);
  
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, searchParams.get('name'), searchParams.get('room')]);
  
  useEffect(() => {
    socket.on('message',(message) =>{
      setMessages([...messages,message]) ;
    })
  },[messages]);

  const sendMessage = (event) => {
    event.preventDefault() ;
    if(message){
      console.log('message at client => ',message) ;
      socket.emit('sendMessage',message,() => setMessage(''))
    }
  }
  console.log(message,messages) ;


  return (
    <div className="outerContainer bg-white">
      <div className="container">
        <input 
        className="chat-input input input-bordered input-accent w-full max-w-xs"
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={e => e.key === 'Enter' ? sendMessage(e):null}
        />
      </div>
    </div>
  )
}

export default Chat;