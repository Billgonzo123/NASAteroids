import React, { useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Welcome from "../components/Welcome";
import Footer from "../components/Footer";

const Home = () => {
  const [elements] = useState([
    "Welcome", 
    "Login", 
    "Signup"
  ]);
  const [show, setShow] = useState(elements[0]);

  return (
    <>
      <Welcome 
        elements={elements} 
        show={show} 
        setShow={setShow} 
      />
      <Login
        elements={elements}
        show={show}
        setShow={setShow}  
      />
      <Signup
        elements={elements}
        show={show}
        setShow={setShow}  
      />
      <main>
        {show === "Welcome" && <Welcome />}
        {show === "Login" && <Login />}
        {show === "Signup" && <Signup />}
      </main>
      <Footer />
    </>
  );
};

export default Home;
