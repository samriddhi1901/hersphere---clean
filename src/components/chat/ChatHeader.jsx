import { Bot, Sparkles } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="bg-white/20 p-4 rounded-2xl">
          <Bot size={30} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            HerSphere AI Assistant
          </h1>

          <p className="text-pink-100">
            Your private women's health companion
          </p>
        </div>
      </div>

      <button className="bg-white text-pink-600 px-5 py-3 rounded-xl font-semibold hover:bg-pink-50 transition flex items-center gap-2">
        <Sparkles size={18} />
        New Chat
      </button>
    </div>
  );
}