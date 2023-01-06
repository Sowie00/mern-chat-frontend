import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <button
      onClick={handleClick}
      className="bg-[#01BAEF] flex justify-center p-1 rounded-xl border-2 border-solid border-[#01BAEF] hover:scale-105 duration-300 items-center h-6 w-6 sm:w-9 sm:h-9"
    >
      <AiOutlineLogout color="black" size={18} />
    </button>
  );
};

export default Logout;
