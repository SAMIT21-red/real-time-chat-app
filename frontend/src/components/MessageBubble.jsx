import React from "react";

const avatarColors = [
  "from-blue-500 to-cyan-500",
  "from-green-500 to-emerald-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-violet-500",
  "from-teal-500 to-green-500",
];

const getAvatarColor = (name) => {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }

  return avatarColors[hash % avatarColors.length];
};

const MessageBubble = ({ message, isOwnMessage }) => {
  const avatar = message.sender.charAt(0).toUpperCase();

  const avatarColor = getAvatarColor(message.sender);

  const time = message.timeStamp
    ? new Date(message.timeStamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : message.time;

  return (
    <div
      className={`flex items-end gap-3 mb-6 animate-[fadeIn_.25s_ease]
      ${isOwnMessage ? "justify-end" : "justify-start"}`}
    >
      {!isOwnMessage && (
        <div
          className={`w-11 h-11 rounded-full bg-gradient-to-r ${avatarColor}
          flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0`}
        >
          {avatar}
        </div>
      )}

      <div
        className={`max-w-[75%] lg:max-w-[55%]
        rounded-3xl px-5 py-4 shadow-lg transition-all duration-200 hover:shadow-2xl
        ${
          isOwnMessage
            ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-md"
            : "bg-slate-800 text-white rounded-bl-md border border-slate-700"
        }`}
      >
        <div className="flex items-center justify-between gap-5 mb-2">
          <h4 className="font-semibold text-sm truncate">
            {message.sender}
          </h4>

          <span
            className={`text-[11px] ${
              isOwnMessage ? "text-blue-100" : "text-gray-400"
            }`}
          >
            {time}
          </span>
        </div>

        <p className="text-[15px] leading-7 break-words">
          {message.content}
        </p>
      </div>

      {isOwnMessage && (
        <div
          className={`w-11 h-11 rounded-full bg-gradient-to-r ${avatarColor}
          flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0`}
        >
          {avatar}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;