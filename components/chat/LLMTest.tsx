"use client";
import { sendChat } from "@/app/actions/chat";

const LLMTest = () => {
  const handleChat = async () => {
    const response = await sendChat();
    console.log(response);
  };

  return (
    <div>
      <button onClick={handleChat}>Send Chat</button>
    </div>
  );
};

export default LLMTest;
