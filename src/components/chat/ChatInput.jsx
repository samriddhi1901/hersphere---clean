import { useState } from "react";
import { Send, Mic } from "lucide-react";

export default function ChatInput({ onSend, loading }) {
  const [text, setText] = useState("");

  function handleSend() {
    if (!text.trim()) return;

    onSend(text);
    setText("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSend();
    }
  }

  return (
    <div className="mt-6 bg-white rounded-2xl shadow-sm flex items-center p-3 gap-3">

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask your health question..."
        className="flex-1 outline-none px-3"
      />

      <button className="p-2 rounded-full hover:bg-gray-100">
        <Mic />
      </button>

      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-pink-500 text-white p-3 rounded-xl hover:bg-pink-600 disabled:opacity-50 transition"
      >
        <Send size={18} />
      </button>

    </div>
  );
}