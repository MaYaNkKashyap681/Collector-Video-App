import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { ItemCard } from "../components";
const baseUrl = "http://localhost:3000/card";

const Card = ({
  _id,
  cname,
  clink,
  removeCard,
  fetchCard,
  bucket_id,
  b_name,
}) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    await removeCard(e, _id);
  };

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(cname);
  const [link, setLink] = useState(clink);

  const updateCard = async (e) => {
    e.preventDefault();
    if (title == cname && link == clink) {
      return;
    }
    if (title == cname) {
      setTitle("");
    }
    if (link == clink) {
      setLink("");
    }

    try {
      const res = await axios.patch(`${baseUrl}/update`, {
        id: _id,
        newName: title,
        newLink: link,
      });

      if (res) {
        fetchCard();
      }
    } catch (err) {
      return;
    } finally {
      setTitle(cname), setLink(clink);
      setEdit((prev) => !prev);
    }
  };

  return (
    <>
      <div
        className={`${
          edit
            ? "bg-white"
            : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        } p-[2px] shadow-sm flex-col rounded-lg my-2`}
      >
        <div
          className={`bg-white font-bold rounded-lg shadow-md px-4 py-4 cursor-pointer  flex h-full justify-between items-center w-full`}
        >
          <Link to={`/video?vlink=${clink}`}>
            <span className="hover:text-blue-100">{cname}</span>
          </Link>
          <div className="flex gap-x-2">
            <div
              className="lg:h-[30px] lg:w-[60px] h-[20px] w-[40px] lg:text-[16px] text-[10px] bg-blue-500 shadow-sm rounded-lg text-white flex justify-center items-center"
              onClick={() => setEdit((prev) => !prev)}
            >
              Edit
            </div>
            <div
              className="lg:h-[30px] lg:w-[60px] h-[20px] w-[40px] lg:text-[16px] text-[10px] bg-red-500 shadow-sm rounded-lg text-white flex justify-center items-center"
              onClick={handleDelete}
            >
              Delete
            </div>
          </div>
        </div>
        <div>
          {edit ? (
            <div className="my-[30px] px-8 w-full top-20 left-4 bg-grey-200 z-10 shadow-lg py-8">
              <div>
                <label className="block text-gray-700">Video Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  placeholder="Enter Video Title"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Video Link</label>
                <input
                  type="text"
                  name="link"
                  id="link"
                  value={link}
                  placeholder="Enter Video Link"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                  required
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>

              <div
                type="submit"
                className="w-full flex justify-center items-center bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6 cursor-pointer"
                onClick={updateCard}
              >
                Update
              </div>
              <ItemCard pname={b_name} bucket_id={bucket_id} card_id={_id} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

const BucketDetail = () => {
  const [queryParameters] = useSearchParams();
  const bucket_Id = queryParameters.get("bucketId");
  const [toggle, setToggle] = useState(false);
  const [cards, setCards] = useState(null);
  const [newCard, setNewCard] = useState({
    title: "",
    link: "",
  });

  const [inProgress, setInProgress] = useState(false);

  const handleChange = (e) => {
    setNewCard({ ...newCard, [e.target.name]: e.target.value });
  };

  const addCard = async (e) => {
    e.preventDefault();
    if (newCard.title.length == 0 || newCard.link.length <= 5) {
      return;
    }
    setInProgress(true);
    try {
      const res = await axios.post(`${baseUrl}/add`, {
        bucketId: bucket_Id,
        name: newCard.title,
        link: newCard.link,
      });
      if (res.status === 200) {
        fetchCard();
      }
    } catch (err) {
      console.log(err);
      return;
    } finally {
      setNewCard({ ...newCard, title: "", link: "" });
      setInProgress(false);
      setToggle(false);
    }
  };

  const fetchCard = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/bucket/single/${bucket_Id}`
      );
      if (res.status === 200) {
        console.log(res.data);
        setCards(res.data);
      }
    } catch (err) {
      return;
    }
  };

  const removeCard = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`${baseUrl}/remove`, {
        id: id,
      });

      if (res.status === 200) {
        fetchCard();
      }
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    fetchCard();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={` ${styles.paddingX} min-h-screen mt-[100px] relative `}>
      <h1 className="lg:text-6xl text-3xl gradient-1 p-2 text-white rounded-sm shadow-sm">
        {cards != null ? cards[0].bname : ""}
      </h1>
      <div className="flex items-center justify-between mt-[30px]">
        <h1 className="font-light lg:text-[40px] text-[20px]">
          Your Collections
        </h1>
        <div
          className={`${styles.buttonGeneral} bg-yellow-200 text-grey font-light lg:text-[18px] text-[14px] rounded-md hover:bg-yellow-100`}
          onClick={() => setToggle((prev) => !prev)}
        >
          Add Card
        </div>
      </div>

      {toggle ? (
        <div className="mt-[30px] px-8 fixed w-full top-20 left-4 bg-white z-10 shadow-lg py-8">
          <div>
            <div
              className="p-4 flex justify-center items-center bg-red-500 rounded-full h-[30px] w-[30px] mb-10 hover:bg-red-200 cursor-pointer"
              onClick={() => setToggle(false)}
            >
              <h1 className="font-bold text-white">X</h1>
            </div>
            <label className="block text-gray-700">Video Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter Video Title"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Video Link</label>
            <input
              type="text"
              name="link"
              id="link"
              placeholder="Enter Video Link"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
              required
              onChange={handleChange}
            />
          </div>

          <div
            type="submit"
            className="w-full flex justify-center items-center bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6 cursor-pointer"
            onClick={addCard}
          >
            {!inProgress ? (
              "Add Card"
            ) : (
              <div className="h-[20px] w-[20px] bg-white rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="flex-col mt-[30px]">
        {cards == null || cards?.length == 0 ? (
          <>
            <div className={`${styles.padding}`}>
              <h1 className="text-2xl font-extralight">No Cards to Show</h1>
            </div>
          </>
        ) : (
          cards &&
          cards[0].cards.map((card) => (
            <div key={card._id}>
              <Card
                {...card}
                removeCard={removeCard}
                fetchCard={fetchCard}
                bucket_id={bucket_Id}
                b_name={cards[0].bname}
              />
            </div>
          ))
        )}
      </div>
      {/* <ItemCard/> */}
    </div>
  );
};

export default BucketDetail;
