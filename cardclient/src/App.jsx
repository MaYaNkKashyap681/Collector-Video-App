import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import { Navbar } from "./components/index";
import { Provider } from 'react-redux';

import store from "./store";
import {
  Authentication,
  Home,
  Register,
  BucketDetail,
  Video,
} from "./pages/index";

function App() {
 
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div className="relative z-0 bg-primary">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Authentication />} />
            <Route path="/register" element={<Register />} />
            <Route path="/bucket" element={<BucketDetail />} />
            <Route path="/video" element={<Video />} />
          </Routes>
        </div>
        <Footer />
        {/*
      <Footer/> */}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
