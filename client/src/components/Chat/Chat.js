
import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import './Chat.css'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'

let socket
const Chat = ({ location }) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const ENDPOINT = 'localhost:5000'
  // const ENDPOINT = 'https://react-socketio-chat.herokuapp.com/'

  //connect
  useEffect(() => {
    const { room, name } = queryString.parse(location.search)
    socket = io(ENDPOINT)
    setName(name)
    setRoom(room)
    socket.emit('join', { name, room }, () => { })
    return () => {
      socket.emit('disconnect')
      socket.off()
    }
    
  }, [ENDPOINT, location.search])
  

  //send message
  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message])
    })
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }
  
  
  // console.log(message, messages)
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room}></InfoBar>
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
      {/* <TextContainer users={users}/> */}
    </div>
  )
}


export default Chat;