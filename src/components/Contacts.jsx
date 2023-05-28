import React, { useState, useEffect } from "react";
import styled from "styled-components";


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
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: #ffa922;
      text-transform: uppercase;
    }
  }

 
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    min-width:18vw;
    min-height: 82vh;
    gap: 1rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background:transparent;
      min-height: 3rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem 1rem;
      border :0.1rem solid  #080420;
      display: flex;
      gap: 1rem;
      align-items: center;
      .avatar {
        img {
          height: 2.5rem;
          width: 2.5rem;
          border-radius:50%;
          border:2px solid #ffa922;
        }
      }
      .username {
        h3 {
          color: #ffa922;
          text-transform: capitalize;
          font-weight: normal
        }
      }
      &:hover{
        border :0.1rem solid #ffa922;
      }
    }
    .selected {
        border :0.1rem solid #ffa922;
    }
  }

  .current-user {
    background: linear-gradient(to right, #f5c882, #ffa922);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem 1rem;
    gap: 2rem;
    .avatar {
      img {
        height: 55px;
        width: 55px;
        border-radius:50%;
        border:0.2rem solid black;
      }
    }
    .username {
      h2 {
        color: black;
        text-transform: capitalize;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts