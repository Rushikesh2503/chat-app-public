import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components'
import Logout from './Logout'
import ChatInput from './ChatInput'
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

const ChatContainer = ({currentChat,socket}) => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
    
  useEffect( () => {
    const setMsg= async()=>{
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
    setMsg()
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        if (msg.from === currentChat._id) {
          setArrivalMessage({ fromSelf: false, message: msg.message });
        }
      });
    }
  }, [socket, currentChat]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <Container>
        <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout className="logout-desktop" />
      </div>
      
      <div className="chat-messages">
      { 
        messages && messages.length<=0?(
          <EmptyChat>
          <img src="https://res.cloudinary.com/rsbrsb/image/upload/v1685213268/brew_apps/no_messages_rosii0.png" alt="Empty Chat" />
          <div className="no-messages">No Messages</div>
          <p>Start a conversation to see messages.</p>
        </EmptyChat>
        ):<>{messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}</>
      }
        
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  gap: 0.1rem;
  overflow: hidden;
  
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: #080420;
    min-height: 60px;
    
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .avatar {
        img {
          height: 3rem;
          width: 3rem;
          border-radius: 50%;
          
          @media (max-width: 768px) {
            height: 2.5rem;
            width: 2.5rem;
          }
        }
      }
      
      .username {
        h3 {
          color: white;
          font-size: 1.2rem;
          
          @media (max-width: 768px) {
            font-size: 1rem;
          }
        }
      }
    }
  }
  
  .chat-messages {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;
    gap: 1rem;
    overflow: auto;
    background-color: #0d0d30;
    
    @media (max-width: 768px) {
      padding: 0.5rem;
    }
    
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    
    .message {
      display: flex;
      align-items: center;
      
      .content {
        max-width: 60%;
        overflow-wrap: break-word;
        padding: 0.8rem 1rem;
        font-size: 1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        
        @media (max-width: 768px) {
          max-width: 80%;
          padding: 0.6rem 0.8rem;
          font-size: 0.9rem;
        }
        
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }

  .logout-desktop {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const EmptyChat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #ccc;
  height: 100%;
  
  p {
    display: flex;
    color: #ccc;
    padding: 1.5rem 0;
    text-align: center;
    
    @media (max-width: 768px) {
      padding: 1rem 0;
      font-size: 0.9rem;
    }
  }
  
  img {
    width: 7rem;
    
    @media (max-width: 768px) {
      width: 5rem;
    }
  }

  .no-messages {
    margin-top: 1rem;
    font-size: 1.5rem;
    
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;



export default ChatContainer