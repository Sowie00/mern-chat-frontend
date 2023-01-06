import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { getAllUsersRoute, host } from "../utils/apiRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

const Chat = () => {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [activeChat, setActiveChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    };
    getCurrentUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const getUsers = async () => {
      if (currentUser) {
        if (currentUser.isProfilePicSet) {
          const data = await axios.get(
            `${getAllUsersRoute}/${currentUser._id}`
          );
          setContacts(data.data);
        } else {
          navigate("/setprofilepicture");
        }
      }
    };
    getUsers();
  }, [currentUser, navigate]);
  const handleChatChange = (chat) => {
    setActiveChat(chat);
  };
  return (
    <div className="h-screen w-screen flex flex-col justify-center gap-4 items-center bg-[#131324]">
      <div className=" h-chatH w-chatW bg-[#00000076] rounded-lg shadow-2xl shadow-indigo-500 grid grid-cols-contactsContainerSmall sm:grid-cols-contactsContainer">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoaded && activeChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            activeChat={activeChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
