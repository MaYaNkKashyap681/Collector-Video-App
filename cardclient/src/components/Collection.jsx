import React, { useEffect, useState } from "react";
import { styles } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuckets, buckets } from "../sllices/bucketSlice";
import axios from "axios";
import CollectionCard from "./CollectionCard";

const baseUrl = "http://localhost:3000/bucket";

const Collection = () => {
  const dispatch = useDispatch();
  const bucketsList = useSelector(buckets);

  const [toggle, setToggle] = useState(false);
  const [newBucket, setNewBucket] = useState({
    title: "",
    desc: "",
  });
  const [inProgress, setInProgress] = useState(false);

  const handleChange = (e) => {
    setNewBucket({ ...newBucket, [e.target.name]: e.target.value });
  };
  const addBucket = async (e) => {
    e.preventDefault();
    if (newBucket.title.length <= 6 || newBucket.desc.length >= 20) {
      return;
    }
    setInProgress(true);
    try {
      const token = JSON.parse(localStorage.getItem('collector_token'));

      const res = await axios.post(
        `${baseUrl}/add`,
        {
          name: newBucket.title,
          desc: newBucket.desc,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        dispatch(fetchBuckets());
      }
    } catch (err) {
      console.log(err);
      return;
    } finally {
      setNewBucket({ ...newBucket, title: '', desc: '' });
      setInProgress(false);
      setToggle(false);
    }
  };

  // const fetchBuckets = async () => {
  //   try {
  //     const res = await axios.get(`${baseUrl}/all`);
  //     if (res.status === 200) {
  //       setBuckets(res.data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return;
  //   }
  // };

  const renameBucket = async (e, id) => {
    e.preventDefault;
    try {
      const res = await axios.patch(`${baseUrl}/rename`, {
        id: id,
        newName: newBucket.title,
      });

      if (res.status === 200) {
        dispatch(fetchBuckets());
      }
    } catch (err) {
      return;
    }
  };



  useEffect(() => {

    if (localStorage.getItem('collector_token')) {
      dispatch(fetchBuckets());
    }
    
  }, []);

  return (
    <div className="mt-[30px]" id="collection">
      <div
        className={`flex flex-row items-center justify-between ${styles.paddingX}`}
      >
        <h1 className="font-light lg:text-[40px] text-[20px]">
          Your Collections
        </h1>

        <div
          className={`${styles.buttonGeneral} bg-yellow-200 text-grey font-light lg:text-[18px] text-[14px] rounded-md hover:bg-yellow-100`}
          onClick={() => setToggle((prev) => !prev)}
        >
          Add Bucket
        </div>
      </div>

      {toggle ? (
        <div className="mt-[30px] px-12 py-2">
          <div>
            <label className="block text-gray-700">Bucket Name</label>
            <input
              type="text"
              name="title"
              placeholder="Enter BUcket Name"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Bucket Description</label>
            <input
              type="text"
              name="desc"
              id="desc"
              placeholder="Enter Bucket Description"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
              required
              onChange={handleChange}
            />
          </div>

          <div
            className="w-full flex items-center justify-center cursor-pointer bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
            onClick={addBucket}
          >
            {!inProgress ? (
              "Add Bucket"
            ) : (
              <div className="h-[20px] w-[20px] bg-white rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      {bucketsList.length === 0 ? (
        <>
          <div className={`${styles.padding}`}>
            <h1 className="text-6xl font-extralight">No Buckets to Show</h1>
          </div>
        </>
      ) : (
        <div className={`${styles.padding} flex flex-wrap gap-8`}>
          {bucketsList?.map((bucket) => (
            <div
              key={bucket._id}
              className="lg:h-[200px] lg:w-[200px] bg-gradient-to-r from-cyan-500 to-blue-500 h-[120px] w-[120px] flex-col justify-center items-center relative shadow-md group cursor-pointer"
            >
              <CollectionCard {...bucket} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;
