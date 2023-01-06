import React, { useState, useEffect, useRef } from "react";
import Logout from "./Logout";
import MessageInput from "./MessageInput";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./ChatContainer.css";
import { sendMessageRoute, getAllMessagesRoute } from "../utils/apiRoutes";
const ChatContainer = ({ activeChat, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivedMessage, setArrivedMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const getMessages = async () => {
      const data = await JSON.parse(localStorage.getItem("chat-app-user"));
      if (activeChat) {
        const response = await axios.post(getAllMessagesRoute, {
          from: data._id,
          to: activeChat._id,
        });
        setMessages(response.data);
      }
    };
    getMessages();
  }, [activeChat]);

  useEffect(() => {
    const getActiveChat = async () => {
      if (activeChat) {
        await JSON.parse(localStorage.getItem("chat-app-user"))._id;
      }
    };
    getActiveChat();
  }, [activeChat]);
  const handleSendMessage = async (message) => {
    const data = await JSON.parse(localStorage.getItem("chat-app-user"));

    socket.current.emit("send-msg", {
      to: activeChat._id,
      from: data._id,
      message,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: activeChat._id,
      message,
    });

    const msgs = [...messages];
    msgs.push({
      fromSelf: true,
      message,
    });
    setMessages(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("getMessage", (message) => {
        setArrivedMessage({ fromSelf: false, message });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivedMessage && setMessages((prev) => [...prev, arrivedMessage]);
  }, [arrivedMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {activeChat && (
        <div className="grid grid-rows-messages gap-chat overflow-hidden">
          <div className="flex justify-between items-center px-6 py-0">
            <div className="flex items-center gap-4">
              <div className="border-solid border-2 rounded-full border-[#01BAEF] hover:scale-105 hover:shadow-md hover:shadow-white duration-300">
                <img
                  className=" h-7 sm:h-12"
                  src={`data:image/svg+xml;base64,${activeChat.profilePic}`}
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-white text-sm sm:text-base">
                  {activeChat.username}
                </h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages py-4 px-8 flex flex-col gap-4 overflow-auto">
            {messages.map((message) => {
              return (
                <>
                  {message.fromSelf ? (
                    <div ref={scrollRef} key={uuidv4()}>
                      <div className="flex items-center justify-end">
                        <div className="break-words p-3 sm:p-4 text-xs sm:text-lg rounded-2xl text-[#d1d1d1] justify-end bg-[#4f04ff21]">
                          <p>{message.message}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div ref={scrollRef} key={uuidv4()}>
                      <div className="flex items-center">
                        <div className="break-words p-3 sm:p-4 text-xs sm:text-lg rounded-2xl text-[#d1d1d1] justify-end bg-[#9900ff20]">
                          <p>{message.message}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
          <MessageInput handleSendMessage={handleSendMessage} />
        </div>
      )}
    </>
  );
};

export default ChatContainer;
