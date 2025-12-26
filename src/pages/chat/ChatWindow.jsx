import React, { useState } from "react";

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
        Select a person to start chatting
      </div>
    );
  }

  const sendMessage = () => {
    if (!text.trim()) return;

    setMessages([...messages, { sender: "me", text }]);
    setText("");
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white font-semibold">
        {selectedUser.name}
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs px-4 py-2 rounded-lg ${
              msg.sender === "me"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
