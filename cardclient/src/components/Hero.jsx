import React, { useEffect, useRef } from "react";
import { styles } from "../styles";
import gsap from "gsap";

const Hero = () => {
  const ballref = useRef(null);

  useEffect(() => {
    gsap.to(ballref.current, {
      y: ballref.current.offsetTop * 2,
      repeat: Infinity,
      yoyo: true,
    });
  });
  return (
    <section className="relative w-full h-screen mx-auto">
      <div className="absolute top-[160px] left-10">
        <h1 className={`${styles.heroHeadText}`}>Collector</h1>
        <p className={`${styles.heroSubText}`}>
          A place where you can store the collection of the videos
        </p>
      </div>
      <div className="absolute xs:bottom-10 bottom-20 w-full flex justify-center items-center">
        <a href="#collection">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <div className="w-3 h-3 rounded-full bg-white mb-1" ref={ballref} />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
