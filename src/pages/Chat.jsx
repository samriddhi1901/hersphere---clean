import { useState } from "react";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";

import ChatHeader from "../components/chat/ChatHeader";
import SuggestedQuestions from "../components/chat/SuggestedQuestions";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

import { sendMessage } from "../services/api";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      message:
        "Hello! 🌸 I'm your AI Women's Health Assistant. Ask me anything related to women's health.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  async function handleSend(text) {
    if (!text.trim()) return;

    const userMessage = {
      sender: "user",
      message: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const reply = await sendMessage(text);

    setMessages((prev) => [
      ...prev,
      {
        sender: "assistant",
        message: reply,
      },
    ]);

    setLoading(false);
  }

  return (
    <AuthenticatedLayout>
      <ChatHeader />

      <SuggestedQuestions onSelect={handleSend} />

      <ChatWindow
        messages={messages}
        loading={loading}
      />

      <ChatInput
        onSend={handleSend}
        loading={loading}
      />
    </AuthenticatedLayout>
  );
}