
import React, { useEffect, useState } from "react";
import ChatInterface from "./components/ChatInterface";

const SplashScreen = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance("Welcome to VeltrixAI");
    setTimeout(() => {
      synth.speak(utterance);
    }, 1000);
    const timer = setTimeout(onDone, 4000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <img src="/logo.png" alt="VeltrixAI Logo" className="w-32 h-32 animate-fade-in" />
      <h1 className="text-2xl mt-4 animate-slide-in">Welcome to VeltrixAI</h1>
    </div>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return showSplash ? <SplashScreen onDone={() => setShowSplash(false)} /> : <ChatInterface />;
};

export default App;
