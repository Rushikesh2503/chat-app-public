import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import Contacts from "../components/Contacts";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    console.log(currentUser)
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
          setTimeout(() => {
            setLoading(false);
          }, 500);
        } else {
          navigate("/setAvatar");
        }
      } else {
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
        {loading ? (
          <Container>
            <img
              src="https://res.cloudinary.com/rsbrsb/image/upload/v1685164557/brew_apps/loader_sx00aa.gif"
              alt="loader"
              className="loader"
            />
          </Container>
        ) : (
          <>
            {contacts && contacts.length > 0 ? (
              <Container>
                <HamburgerMenu onClick={toggleMenu}>
                  {
                    isMenuOpen?
                    <FontAwesomeIcon icon={faTimes} />:
                    <FontAwesomeIcon icon={faBars} />
                  }
                  
                </HamburgerMenu>
                <div className="container">
                  <ContactWrapper isMenuOpen={isMenuOpen}>
                      <Contacts contacts={contacts} changeChat={handleChatChange} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                  </ContactWrapper>
                  {currentChat === undefined ? (
                    <Welcome />
                  ) : (
                    <ChatContainer currentChat={currentChat} socket={socket} />
                  )}
                </div>
              </Container>
            ) : (
              <Container>
                <img
                  src="https://res.cloudinary.com/rsbrsb/image/upload/v1685164557/brew_apps/loader_sx00aa.gif"
                  alt="loader"
                  className="loader"
                />
              </Container>
            )}
          </>
        )}
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
  overflow-y:auto;
  background-color: #131324;
  .container {
    height: 80vh;
    width: 90vw;
    background-color: #000000;
    display: flex;
  }
  .loader {
    height: 50vh;
    width: 25vw;
    background-color: #000000;
    border:none
  }
`;

//hamburger code as small screen size
const HamburgerMenu = styled.div`
  display: none;
  position: absolute;
  top: 2vw;
  right:5vw;
  color:white;
  background:transparent;
  cursor:pointer;
  img{
    width:25px;
    height:25px;
  }
  @media (max-width: 1068px) {
    display: block;
  }
`;
const ContactWrapper =  styled.div`
  display: flex;

@media (max-width: 1068px) {
  display: ${({ isMenuOpen }) => (isMenuOpen ? 'block' : 'none')};
  position: fixed;
  width:80vw;
  top: 0;
  left: 0;
}
`;


export default Chat;
