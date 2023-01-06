import React from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-12 bg-[#131324] h-screen w-screen">
      <HashLoader color="#6A69FA" size={80} />
    </div>
  );
};

export default Loading;
