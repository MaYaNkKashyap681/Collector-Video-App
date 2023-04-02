import React from "react";
import { Navbar, Hero, Collection } from "../components";

const Home = () => {
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
