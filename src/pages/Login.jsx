import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled,{ keyframes } from 'styled-components';
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loginRoute } from '../utils/APIRoutes';

const rotateAnimation = keyframes`
from {
  transform: perspective(800px) rotateY(90deg);
}
to {
  transform: perspective(800px) rotateY(0deg);
}
`;



const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    
    const [values,setValues]=useState({
        email:"",
        password:"",
    })

    useEffect(() => {
      if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/");
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleSubmit=async(event)=>{
        event.preventDefault();
        if(handleValidation()){
            const {password,email}=values;
            
            try {
                const {data} = await axios.post(loginRoute, {
                    email,
                    password,
                  });
               
                if(data.status===false){
                 toast.error(data.message,toastOptions);
                }
                if(data.status===true){
                 localStorage.setItem("chat-app-user",JSON.stringify(data.user));
                    navigate("/");
                }
              } catch (error) {
                const {response}=error
                toast.error(response.data.message,toastOptions);
              }
            

        }
    }
    const handleChange=(event)=>{
        const {name,value}=event.target;
        setValues({...values,[name]:value});
    }
    const toastOptions={
        position:toast.POSITION.TOP_RIGHT,
        autoClose:5000,
        pauseOnHover:true,
        draggable:true,
        theme:'dark'
    }

    const handleValidation=()=>{
       const {password,email}=values;
        if(password.length<8){
        toast.error('Password should be equal or greater than 8 characters',toastOptions);
        return false;
       }
       else if(email===""){
        toast.error('Email is required',toastOptions);
        return false;
       }
       return true;
    }
  return (
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
    <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)} autoComplete="off">
            <div className="brand">
                <img  src="https://res.cloudinary.com/rsbrsb/image/upload/v1685167424/brew_apps/chatbee2_pojnjf.png" alt="" />
                <h1>CHATBEE</h1>
            </div>
            
            <input type="email" name="email" placeholder="Email" onChange={(e)=>handleChange(e)}/>
            <input type="password" name="password" placeholder="Password " onChange={(e)=>handleChange(e)}/>
            <button type="submit">Login</button>
            <div className="account_already">Don't have an account ? <Link  to="/register"> Register</Link></div>
        </form>

    </FormContainer>
     <ToastContainer/>
    </>
        )}
    </>
  )
}

const FormContainer=styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#131322;
.brand{
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    img{
        height:5rem;
        border-radius:1rem;
    }
    h1{
        color:#FFA922
     }
}
.account_already{
    display:flex;
    justify-content:center;
    a {
        text-decoration:none;
        margin:0 0.3rem;
        color: #ffa922;
    }
}

form{
    display:flex;
    justify-content:center;
    flex-direction:column;
    width:90%;
    max-width:480px;
    gap:2rem;
    background-color:#00000076;
    color:white;
    border-radius:2rem;
    padding:3rem 3rem;
    border:0.1rem solid #ffa922;
    animation: ${rotateAnimation} 1s ease-in-out;
    input{
        background-color:transparent;
        padding:1rem;
        border:0.1rem solid #f5c882;
        border-radius:0.4rem;
        color:#ffa922;
        width:100%;
        font-size:1rem;
        &:focus {
         border:0.1rem solid #ffa922;
         outline:none;
        }
    }
    button{
        background: linear-gradient(to right, #ffa922, #f5c882);
        padding:1rem 2rem;
        border:none;
        font-size:1rem;
        cursor:pointer;
        border-radius:0.5rem;
        text-transform:uppercase;
        transition:0.5s ease-in-out;
        &:hover {
            background: linear-gradient(to right, #f5c882, #ffa922);
        }

    }
}
`;

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
.container{
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

export default Login