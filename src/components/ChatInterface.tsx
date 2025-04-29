
import React, { useState } from "react";

const ChatInterface = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, "You: " + userMessage]);
    setInput("");

    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyD921NRPlk8aDSNdylh5d8B_w4mSQgC4gE", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: userMessage }] }] }),
    });

    const data = await res.json();
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No reply.";
    setMessages((prev) => [...prev, "VeltrixAI: " + botReply]);
  };

  return (
    <div className="p-4">
      <div className="h-[60vh] overflow-y-auto bg-gray-800 p-2 rounded">
        {messages.map((msg, idx) => <div key={idx} className="mb-2">{msg}</div>)}
      </div>
      <div className="flex gap-2 mt-4">
        <input className="flex-1 p-2 rounded bg-gray-900 text-white" value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="bg-green-600 px-4 py-2 rounded" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
