import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { buckets } from "../sllices/bucketSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ItemCard = ({ pname, bucket_id, card_id }) => {
  const navigate = useNavigate();
  const [bucketsList, setBucketsList] = useState(null);
  const [currentId, setCurrentId] = useState("Select One Id");
  const [currentName, setCurrentName] = useState(null);
  // const bucket = useSelector(buckets);

  const handleMove = (id, name) => {
    setCurrentId(id);
    setCurrentName(name);
  };

  const moveCard = async () => {
    try {
      const res = await axios.patch(`http://localhost:3000/bucket/movecard`, {
        oldBucketId: bucket_id,
        newBucketId: currentId,
        cardId: card_id,
      });

      if (res) {
        navigate("/");
      }
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("buckets");
    if (data != null) {
      setBucketsList(JSON.parse(data));
    } else {
      navigate("/");
    }
  }, [bucket_id]);

  const [opened, setOpened] = useState(false);
  return (
    <div className="flex-col mt-1">
      <div className="w-full flex justify-center items-center shadow-md rounded-md gap-2 p-2">
        <div className="flex-6 bg-white h-[12] w-full p-3 border-black border-[2px] rounded-md">
          {pname}
        </div>
        <div className="flex-6 flex items-center justify-between bg-white h-[12] w-full p-3 border-black border-[2px] rounded-md relative">
          <div className="flex-10 w-full">{currentName}</div>
          <div
            className="flex-2 w-[20px] h-[20px] rounded-full flex justify-center items-center cursor-pointer text-white font-bold bg-blue-400"
            onClick={() => setOpened((prev) => !prev)}
          >
            V
          </div>
          {opened ? (
            <div className="lg:w-full w-[300px] right-0 rounded-md h-max-[300px] top-[60px] overflow-y-scroll overflow-x-hidden absolute">
              {bucketsList?.map((item) => (
                <div
                  className="w-full p-2 hover:bg-gray-50 cursor-pointer flex justify-center items-center bg-white border-b-[2px]"
                  key={item.id}
                  onClick={() => {
                    handleMove(item.id, item.name);
                    setOpened(false);
                  }}
                >
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="bg-blue w-full p-3 flex cursor-pointer bg-blue-500 mt-1 text-white font-bold justify-center items-center shadow-md rounded-lg"
      onClick={moveCard}>
        <p>Move</p>
      </div>
    </div>
  );
};

export default ItemCard;
