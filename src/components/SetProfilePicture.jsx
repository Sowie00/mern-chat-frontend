import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import axios from "axios";
import { setProfilePictureRoute } from "../utils/apiRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";

const SetProfilePicture = () => {
  const api = `https://api.multiavatar.com/2345674`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please choose an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(
        `${setProfilePictureRoute}/${user._id}`,
        {
          image: avatars[selectedAvatar],
        }
      );
      console.log(data);
      if (data.isSet) {
        user.isProfilePicSet = true;
        user.profilePic = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error(
          "Error setting profile picture. Please try again!",
          toastOptions
        );
      }
    }
  };
  useEffect(() => {
    const fetchPictures = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    fetchPictures().catch(console.error);
  }, [api]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex justify-center items-center flex-col gap-12 bg-[#131324] h-screen w-screen">
          <div>
            <h1 className="text-white">Choose your profile avatar</h1>
          </div>
          <div className="flex gap-8">
            {console.log(avatars)}
            {avatars.map((avatar, index) => {
              return (
                <div className="border-6 border-solid border-transparent p-avatar rounded-5xl flex justify-center items-center transition-all duration-500 ease-in-out hover:border-6 hover:border-solid hover:border-indigo-500 cursor-pointer">
                  <img
                    className="h-24 transition-all duration-500 ease-in-out"
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="bg-teal-700 text-white py-4 px-8 border-none font-bold cursor-pointer rounded-md uppercase text-base transition-all duration-500 ease-in-out hover:bg-[#591c85]"
            onClick={setProfilePicture}
          >
            Set Profile Picture
          </button>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default SetProfilePicture;
