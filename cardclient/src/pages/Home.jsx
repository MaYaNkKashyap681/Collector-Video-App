import React, {useEffect} from "react";
import { Navbar, Hero, Collection } from "../components";
import { useNavigate } from "react-router-dom";

const Home = () => {

  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Check if 'collector_token' is present in localStorage
  //   const token = localStorage.getItem('collector_token');
  //   if (!token) {
  //     // If not present, navigate to the login page
  //     navigate('/login');
  //   }
  // }, []);
  return (
    <>
      {" "}
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <Collection />
    </>
  );
};

export default Home;
