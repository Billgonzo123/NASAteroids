import React, { useState } from 'react';
import Signup from "../components/Signup";
import Login from "../components/Login";
import Welcome from "../components/Welcome";

const Home = () => {

  const [elements] = useState([
    'Welcome',
    'Login',
    'Signup'
  ]);

  const [show, setShow] = useState(elements[false]);

  return (  
    <>
    <Welcome />
    <Login />
    <Signup />
    </>
  )
}

export default Home;