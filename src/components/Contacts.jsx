import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from './Logout';


const Contacts = ({contacts,changeChat,isMenuOpen,setIsMenuOpen }) => {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        const getContacts=async()=>{
            const data = await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
              );
              setCurrentUserName(data.username);
              setCurrentUserImage(data.avatarImage);
        }
        getContacts();
    }, []);

    const changeCurrentChat = (index, contact) => {
      setIsMenuOpen(false);
        setCurrentSelected(index);
        changeChat(contact);
    };
    return (
    <>
    {currentUserImage && currentUserImage && (
      <Container>
        <div className="brand">
          <img src="https://res.cloudinary.com/rsbrsb/image/upload/v1685167424/brew_apps/chatbee2_pojnjf.png" alt="logo" />
          <h3>CHATBEE</h3>
        </div>
        <div className="contacts">
          {contacts.map((contact, index) => {
            return (
              <div
                key={contact._id}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt=""
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="current-user">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentUserImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h2>{currentUserName}</h2>
          </div>
        </div>
        <div className="logout-mobile">
          <Logout />
        </div>
      </Container>
    )}
  </>
  )
}


const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  height: 100vh;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-rows: 15% 70% 15%;
  }
  
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    padding: 0.5rem;
    
    img {
      height: 2rem;
      
      @media (max-width: 768px) {
        height: 1.5rem;
      }
    }
    
    h3 {
      color: #ffa922;
      text-transform: uppercase;
      font-size: 1.2rem;
      
      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }
  
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.5rem;
    padding: 0.5rem;
    
    @media (max-width: 768px) {
      gap: 0.3rem;
      padding: 0.3rem;
    }
    
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    
    .contact {
      background: transparent;
      min-height: 3rem;
      cursor: pointer;
      width: 100%;
      border-radius: 0.5rem;
      padding: 0.5rem;
      border: 0.1rem solid #080420;
      display: flex;
      gap: 0.8rem;
      align-items: center;
      transition: all 0.3s ease;
      
      @media (max-width: 768px) {
        min-height: 2.5rem;
        padding: 0.4rem;
        gap: 0.6rem;
      }
      
      .avatar {
        img {
          height: 2.5rem;
          width: 2.5rem;
          border-radius: 50%;
          border: 2px solid #ffa922;
          
          @media (max-width: 768px) {
            height: 2rem;
            width: 2rem;
          }
        }
      }
      
      .username {
        h3 {
          color: #ffa922;
          text-transform: capitalize;
          font-weight: normal;
          font-size: 1rem;
          
          @media (max-width: 768px) {
            font-size: 0.9rem;
          }
        }
      }
      
      &:hover {
        border: 0.1rem solid #ffa922;
        background-color: rgba(255, 169, 34, 0.1);
      }
    }
    
    .selected {
      border: 0.1rem solid #ffa922;
      background-color: rgba(255, 169, 34, 0.2);
    }
  }

  .current-user {
    background: linear-gradient(to right, #f5c882, #ffa922);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    gap: 1rem;
    
    @media (max-width: 768px) {
      padding: 0.4rem;
      gap: 0.8rem;
    }
    
    .avatar {
      img {
        height: 3rem;
        width: 3rem;
        border-radius: 50%;
        border: 0.2rem solid black;
        
        @media (max-width: 768px) {
          height: 2.5rem;
          width: 2.5rem;
        }
      }
    }
    
    .username {
      h2 {
        color: black;
        text-transform: capitalize;
        font-size: 1.1rem;
        
        @media (max-width: 768px) {
          font-size: 0.9rem;
        }
      }
    }
  }

  .logout-mobile {
    display: none;
    @media (max-width: 768px) {
      display: flex;
      justify-content: center;
      padding: 0.5rem 0;
    }
  }
`;

export default Contacts