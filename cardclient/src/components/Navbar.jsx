import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { useNavigate } from "react-router-dom";
import { Logo } from "../assets";
import Cookies from "universal-cookie";

const Navbar = () => {
  const cookies = new Cookies();
  const navigate = useNavigate("/");
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("collector_token");
    localStorage.removeItem("cllector_id");
    localStorage.removeItem("collector_email");
    cookies.remove("jwt");

    navigate("/");
  };

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("collector_token")));
    setEmail(JSON.parse(localStorage.getItem("collector_email")));
  });
  return (
    <nav
      className={`${styles.paddingX} 
      bg-white
      w-full flex items-center py-5 fixed top-0 z-20 shadow-xl`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={Logo}
            className="w-[100px] h-[30px] object-center object-cover"
          />
        </Link>
        {token ? (
          <>
            <div className="flex flex-row items-center gap-[10px]">
              <p>{`Hello, ${email}`}</p>
              <div
                className={`font-bold text-white rounded-sm bg-purple-800 ${styles.buttonGeneral} border-2 border-transparent`}
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-row gap-[10px]">
            <Link to="/login">
              <div
                className={`font-light text-black border-white ${styles.buttonGeneral} border-2 rounded-md`}
              >
                Login
              </div>
            </Link>

            <Link to="/register">
              <div
                className={`font-bold text-white rounded-sm bg-purple-800 ${styles.buttonGeneral} border-2 border-transparent`}
              >
                Register
              </div>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
