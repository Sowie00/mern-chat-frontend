import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { IoSendSharp } from "react-icons/io5";
import { BsEmojiSmileFill } from "react-icons/bs";
const MessageInput = ({ handleSendMessage }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    console.log(emojiObject);
    let msg = message;
    msg += emojiObject.emoji;
    setMessage(msg);
  };

  const handleChat = (event) => {
    event.preventDefault();
    if (message.length > 0) {
      handleSendMessage(message);
      setMessage("");
    }
  };
  return (
    <div className="grid grid-cols-chatInput items-center bg-[#080420] py-0 px-4">
      <div className="flex items-center text-white gap-4">
        <div className="relative">
          <div className="lg:ml-4">
            <BsEmojiSmileFill
              onClick={handleEmojiPicker}
              color="#ffff00c8"
              className="cursor-pointer sm:text-2xl"
            />
          </div>
          {showEmojiPicker && (
            <div className="absolute -top-[490px]">
              <Picker
                width={250}
                theme="dark"
                onEmojiClick={handleEmojiClick}
              />
            </div>
          )}
        </div>
      </div>
      <form
        className="w-11/12 h-7 sm:h-10 ml-3 rounded-4xl flex items-center gap-4 sm:gap-8 bg-[#ffffff34]"
        onSubmit={(e) => handleChat(e)}
      >
        <input
          className=" w-full bg-transparent text-xs sm:text-base text-white border-none pl-2 sm:pl-8 selection:bg-[#9a86f3] focus:outline-none"
          type="text"
          name="message"
          id="message"
          placeholder="Type your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="py-1 px-2 h-7 sm:px-8 sm:h-10 rounded-4xl sm:rounded-4xl flex justify-center items-center bg-[#9a86f3] border-none">
          <IoSendSharp color="white" className=" text-xs sm:text-xl" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
