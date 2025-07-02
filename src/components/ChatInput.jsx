import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject, event) => {
    console.log(emojiObject.emoji, event);
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="Type your message here"
          onFocus={()=>setShowEmojiPicker(false)}
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #080420;
  padding: 0.5rem 1rem;
  min-height: 60px;
  
  @media (max-width: 768px) {
    padding: 0.3rem 0.5rem;
    min-height: 50px;
  }
  
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 0.5rem;
    
    @media (max-width: 768px) {
      gap: 0.3rem;
    }
    
    .emoji {
      margin: 0.5rem;
      position: relative;
      
      @media (max-width: 768px) {
        margin: 0.3rem;
      }
      
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
        
        @media (max-width: 768px) {
          font-size: 1.2rem;
        }
      }
      
      .EmojiPickerReact {
        position: absolute;
        top: -350px;
        background: black;
        z-index: 1000;
        
        @media (max-width: 768px) {
          top: -300px;
          transform: scale(0.8);
        }
      }
      
      .epr-emoji-category-label {
        background: linear-gradient(to right, #f5c882, #ffa922);
        color: black;
      }
      
      .epr-search {
        background: black;
        color: white;
        &:focus {
          background: black;
          border-color: #ffa922;
        }
      }
      
      .epr-preview {
        background: linear-gradient(to right, #000000, #000000);
      }
      
      .epr-body {
        &::-webkit-scrollbar {
          width: 0.3rem;
          &-thumb {
            background-color: #ffffff;
            width: 0.2rem;
            border-radius: 1rem;
            height: 7rem;
          }
        }
      }
    }
  }
  
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: #ffffff34;
    padding: 0.5rem;
    
    @media (max-width: 768px) {
      gap: 0.5rem;
      padding: 0.3rem;
    }
    
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1rem;
      
      @media (max-width: 768px) {
        font-size: 0.9rem;
        padding-left: 0.5rem;
      }

      &::selection {
        background-color: #9a86f3;
      }
      
      &:focus {
        outline: none;
      }
      
      &::placeholder {
        color: #ffffff80;
        
        @media (max-width: 768px) {
          font-size: 0.8rem;
        }
      }
    }
    
    button {
      padding: 0.5rem 1rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(to right, #f5c882, #ffa922);
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      
      @media (max-width: 768px) {
        padding: 0.4rem;
        min-width: 35px;
        min-height: 35px;
      }
      
      &:hover {
        transform: scale(1.05);
      }
      
      svg {
        font-size: 1.5rem;
        color: black;
        
        @media (max-width: 768px) {
          font-size: 1.2rem;
        }
      }
    }
  }
`;

