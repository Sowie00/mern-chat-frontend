import React from "react";
import Robot from "../assets/Robot.gif";
const Welcome = ({ currentUser }) => {
  return (
    <div className="flex justify-center items-center flex-col text-white">
      <img className="h-80" src={Robot} alt="Robot" />
      <h1 className=" text-md md:text-3xl">
        Welcome, <span className="text-blue-600">{currentUser.username}!</span>
      </h1>
      <h1 className="text-md md:text-3xl">
        Select a contact to start messaging!
      </h1>
    </div>
  );
};

export default Welcome;
