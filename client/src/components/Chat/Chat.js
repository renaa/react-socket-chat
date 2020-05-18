
import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import './Chat.css'

let socket
const Chat = ({ location }) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const ENDPOINT = 'localhost:5000'

  const sendMessage = (event) => {
    // event.preventDefault()
    if (message) socket.emit('sendMessage', message, () => setMessage(''))
  }

  //connect
  useEffect(() => {
    const { room, name } = queryString.parse(location.search)
    socket = io(ENDPOINT)
    setName(name)
    setRoom(room)
    socket.emit('join', { name, room }, () => { })
    console.log(socket)
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

  // recieive
  console.log(message, messages)
  return (
    <div className="outerContainer">
      <div className="innerContainer">
        <input value={message} preventdefault="true"
          onChange={  event => setMessage(event.target.value)}
          onKeyPress={event => event.key === 'Enter' ?  sendMessage() : console.log(event.key)
        } />
      </div>
    </div>
  )
}


export default Chat;