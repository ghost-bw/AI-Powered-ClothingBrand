import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Hero from "../../components/Home/Hero";
import Navbar from "../../components/Home/Navbar";
import Collections from "../../components/Home/Collections";
import Trending from "../../components/Home/Trending";
import BrandStory from "../../components/Home/BrandStory";
import InnerCircle from "../../components/Home/InnerCircle";
import Footer from "../../components/Home/Footer";

const Home = () => {
  const navigate = useNavigate();

 
    

  return (
    <>
      <Navbar />
      <Hero />
      <Collections />
      <Trending />
      <BrandStory />
      <InnerCircle />
      <Footer />
    </>
  );
};

export default Home;
