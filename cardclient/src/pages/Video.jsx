import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Video = () => {
  const [queryParameters] = useSearchParams();
  const [link, setLink] = useState(null);

  useEffect(() => {
    setLink(queryParameters.get("vlink"));
    console.log(link);
  });

  return (
    <>
      <div className="flex items-center justify-center h-screen mt-[60px] p-8">
        <iframe
          src="https://youtu.be/c_-b_isI4vg"
          className="w-[90%] h-[90%]"
        ></iframe>
      </div>
    </>
  );
};

export default Video;
