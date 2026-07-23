import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages, username }) => {
  const bottomRef = useRef(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 bg-slate-900">
      {messages.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white">
              Welcome 👋
            </h2>

            <p className="text-gray-400 mt-2">
              No messages yet. Start the conversation!
            </p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => {

  if (message.system) {
    return (
      <div
        key={index}
        className="flex justify-center my-4"
      >
        <div className="bg-slate-700 text-gray-200 px-5 py-2 rounded-full text-sm shadow">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <MessageBubble
      key={index}
      message={message}
      isOwnMessage={message.sender === username}
    />
  );

})}

          <div ref={bottomRef}></div>
        </>
      )}
    </div>
  );
};

export default MessageList;