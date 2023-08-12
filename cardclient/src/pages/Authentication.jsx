import React, { useState } from "react";
import { styles } from "../styles";
import { Login } from "../assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie';


const Authentication = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [inProgress, setInProgress] = useState(false);

  const [details, setDeatails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setDeatails({ ...details, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setInProgress(true);
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email: details.email,
        password: details.password,
      });
      // console.log(res);
      if (res.status === 200) {
        const data = res.data;
        const token = data.token;
        const id = data.user
        const email = data.email
        localStorage.setItem("collector_token", JSON.stringify(token));
        localStorage.setItem("collector_email", JSON.stringify(email))
        localStorage.setItem("collector_id", JSON.stringify(id))
        cookies.set("jwt", token);
        navigate("/");
      }
    } catch (err) {
      // console.log(err);
    } finally {
      setDeatails({ ...details, email: "", password: "" });
      setInProgress(false);
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex overflow-hidden">
      <div
        className={`flex-8 ${styles.containerStyle} lg:flex hidden relative justify-center items-center`}
      >
        <img src={Login} className="object-cover h-full w-full" />
        <div className="absolute">
          <h1 className={`${styles.sectionHeadText}`}>Welcome!</h1>
          <p
            className={`${styles.sectionSubText} justify-center text-white p-2 border-2 border-white bg-purple-600`}
          >
            Take step to store the videos links at one place
          </p>
        </div>
      </div>
      <div
        className={`flex-4 ${styles.containerStyle} p-[60px] flex-col mt-[100px] items-center justify-center`}
      >
        <h1 className="font-bold text-black text-xl">Enter your Details!</h1>
        <form className="mt-6" action="#" method="POST">
          <div>
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              minLength="6"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
              onChange={handleChange}
            />
          </div>

          <div className="text-right mt-2">
            <a
              href="#"
              className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
            >
              Forgot Password?
            </a>
          </div>

          <div
            type="submit"
            className="w-full flex items-center justify-center bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6 cursor-pointer"
            onClick={submitForm}
          >
            {!inProgress ? (
              "Login"
            ) : (
              <div className="h-[20px] w-[20px] bg-white rounded-full animate-pulse"></div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
