import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import Contacts from "../components/Contacts";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    const getlocalStore = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          ) 
        );
      }
    };

    getlocalStore();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    setLoading(true);
    const getAllUsers = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
          setTimeout(()=>{
            setLoading(false);
          },500)
        } else {
          navigate("/setAvatar");
        }
      }else{
        setLoading(false);
      }
      
    };
    getAllUsers();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <>
      {
      loading?<Container>
          <img
            src="https://res.cloudinary.com/rsbrsb/image/upload/v1685164557/brew_apps/loader_sx00aa.gif"
            alt="loader"
            className="loader"
          /></Container>:<>
      {contacts && contacts.length > 0 ? (
        <Container>
          <div className="container">
            <Contacts contacts={contacts} changeChat={handleChatChange} />
            {currentChat === undefined ? (
            <Welcome/>
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket}/>
          )}
          </div>
        </Container>
      ) : (
        <Container>
          <img
            src="https://res.cloudinary.com/rsbrsb/image/upload/v1685164557/brew_apps/loader_sx00aa.gif"
            alt="loader"
            className="loader"
          /></Container>
      )}
      
      </>
      }
      
      </>
    
      

      
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #000000;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (min-width: 220px) and (max-width: 720px) {
      grid-template-columns: 45% 55%;
      width: 100vw;
    }
  }
`;

export default Chat;
