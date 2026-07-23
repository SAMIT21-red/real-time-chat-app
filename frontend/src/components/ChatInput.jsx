import React, { useState, useRef, useEffect } from "react";
import {
  FaPaperPlane,
  FaSmile,
  FaPaperclip,
} from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { sendTyping } from "../services/SocketService";

const ChatInput = ({
  onSend,
  roomId,
  username,
  typing,
}) => {
const [message, setMessage] = useState("");
const [showEmojiPicker, setShowEmojiPicker] = useState(false);

const handleEmojiClick = (emojiData) => {
  setMessage((prev) => prev + emojiData.emoji);
};

const handleTyping = (value) => {
  setMessage(value);

  sendTyping(roomId, username, true);

  clearTimeout(typingTimeout.current);

  typingTimeout.current = setTimeout(() => {
    sendTyping(roomId, username, false);
  }, 1000);
};

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);



const pickerRef = useRef(null);
const typingTimeout = useRef(null);

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message.trim());
    setMessage("");
    sendTyping(roomId, username, false);
  };

  return (
    <div className="sticky bottom-0 border-t border-slate-700 bg-slate-900/90 backdrop-blur-md px-6 py-4">
      {typing && (
  <p className="text-sm text-gray-400 animate-pulse mb-2">
    {typing} is typing...
  </p>
)}
      <div className="flex items-center gap-3">

        {/* Emoji */}
        <div className="relative" ref={pickerRef}>
  <button
    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
    className="w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 transition flex items-center justify-center text-yellow-400 text-xl"
  >
    <FaSmile />
  </button>

  {showEmojiPicker && (
    <div className="absolute bottom-14 left-0 z-50">
      <EmojiPicker
        onEmojiClick={handleEmojiClick}
        theme="dark"
        lazyLoadEmojis
      />
    </div>
  )}
</div>

        {/* Attachment */}
        <button
          className="w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 transition flex items-center justify-center text-blue-400 text-lg"
        >
          <FaPaperclip />
        </button>

        {/* Input */}
        <input
          type="text"
          value={message}
          placeholder="Type a message..."
          onChange={(e) => handleTyping(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          className="flex-1 rounded-full bg-slate-800 border border-slate-700 px-6 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
        />

        {/* Send */}
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300
            ${
              message.trim()
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-110"
                : "bg-slate-700 cursor-not-allowed"
            }`}
        >
          <FaPaperPlane />
        </button>

      </div>
    </div>
  );
};

export default ChatInput;