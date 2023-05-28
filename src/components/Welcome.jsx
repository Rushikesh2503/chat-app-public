import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const setUserFromLocal=async()=>{
        setUserName(
            await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
              .username
          );
    }
    setUserFromLocal();
  }, []);
  return (
    <Container>
      <img
        src="https://res.cloudinary.com/rsbrsb/image/upload/v1685164555/brew_apps/robot_ez7esj.gif"
        alt=""
      />
      <h1>
        Welcome, <div>{userName} !</div>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width:100%;
  flex-direction: column;
  h1 {
    display: flex;
  }
  img {
    height: 20rem;
  }
  div {
    color: #ffa922;
    margin: 0 1rem;
  }
  h3 {
    margin: 1rem;
  }
  @media screen and (min-width: 220px) and (max-width: 720px) {
    h1 {
      flex-direction: column;
    }
    div {
      margin: 1rem;
    }
    img {
      height: 15rem;
    }
    h3 {
      margin: 2rem;
      text-align: center;
    }
  }
`;
