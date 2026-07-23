import React from "react";
import {
  FaSignOutAlt,
  FaComments,
  FaUsers,
} from "react-icons/fa";
import { HiStatusOnline } from "react-icons/hi";

const avatarColors = [
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-violet-500",
  "from-teal-500 to-green-500",
];

const getAvatarColor = (name = "") => {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }

  return avatarColors[hash % avatarColors.length];
};

const ChatHeader = ({
  roomId,
  username,
  onLeave,
  onlineCount = 0,
  onlineUsers = [],
}) => {
  const avatarLetter = username?.charAt(0).toUpperCase() || "U";
  const avatarColor = getAvatarColor(username);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/90 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl">
            <FaComments className="text-white text-2xl" />
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold">
              Real-Time Chat
            </h2>

            <div className="flex items-center gap-4 mt-1 flex-wrap">

              <span className="text-gray-400 text-sm">
                Room :
                <span className="ml-1 text-cyan-400 font-semibold">
                  {roomId}
                </span>
              </span>

              <div className="flex items-center gap-1 text-green-400 text-sm">
                <HiStatusOnline />
                Connected
              </div>

            </div>
          </div>
        </div>

        {/* Center */}
        <div className="hidden lg:flex items-center gap-8">

          <div>
            <div className="flex items-center gap-2 text-gray-300">
              <FaUsers className="text-cyan-400" />
              <span>{onlineCount} Online</span>
            </div>

            {onlineUsers.length > 0 && (
              <p className="text-xs text-gray-400 mt-1 max-w-xs truncate">
                {onlineUsers.join(", ")}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">

            <div className="relative">
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-r ${avatarColor}
                flex items-center justify-center text-white font-bold text-lg shadow-lg`}
              >
                {avatarLetter}
              </div>

              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-slate-900"></span>
            </div>

            <div>
              <h3 className="text-white font-semibold">
                {username}
              </h3>

              <p className="text-green-400 text-sm">
                Online
              </p>
            </div>

          </div>

        </div>

        {/* Right */}
        <button
          onClick={onLeave}
          className="flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-5 py-3 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105"
        >
          <FaSignOutAlt />

          <span className="hidden sm:block">
            Leave Room
          </span>

        </button>

      </div>
    </header>
  );
};

export default ChatHeader;