import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages, loading }) {
  return (
    <div className="bg-pink-50 rounded-3xl p-6 mt-6 space-y-4 h-[450px] overflow-y-auto">

      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          sender={msg.sender}
          message={msg.message}
        />
      ))}

      {loading && (
        <MessageBubble
          sender="assistant"
          message="🌸 HerSphere AI is thinking..."
        />
      )}

    </div>
  );
}