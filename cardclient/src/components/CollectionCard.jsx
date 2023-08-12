import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchBuckets } from "../sllices/bucketSlice";

const CollectionCard = ({ _id, bname, desc }) => {
  const dispatch = useDispatch();

  const removeBucket = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.delete("http://localhost:3000/bucket/remove", {
        data: { id: _id },
        headers: { Authorization: "***" },
      });

      if (res) {
        dispatch(fetchBuckets());
      }
    } catch (err) {
      // console.log(err);
      alert(err);
      return;
    }
  };

  return (
    <>
      <div className="bg-transparent min-h-[30px]">
        <h1 className="w-full font-bold text-white my-2 mx-2">{bname}</h1>
      </div>

      <div className="absolute flex-col bg-white lg:h-[120px] h-[100%] w-[100%] bottom-0 hidden group-hover:flex transition-all duration-100 px-4 py-4">
        <p className="text-[12px] ">{desc}</p>

        <Link to={`/bucket?bucketId=${_id}`}>
          <div className="bg-blue-400 text-white font-bold text-[14px] flex items-center justify-center rounded-sm shadow-lg my-2">
            Open
          </div>
        </Link>

        <div
          className="bg-red-400 cursor-pointer hover:bg-red-100 text-white font-bold text-[14px] flex items-center justify-center rounded-sm shadow-lg"
          onClick={removeBucket}
        >
          Delete
        </div>
      </div>
    </>
  );
};

export default CollectionCard;
