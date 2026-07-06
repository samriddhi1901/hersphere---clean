export default function MessageBubble({
  sender,
  message,
}) {
  const isUser = sender === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-3xl px-5 py-4 rounded-3xl shadow-sm whitespace-pre-wrap leading-7 ${
          isUser
            ? "bg-pink-500 text-white"
            : "bg-white text-gray-800"
        }`}
      >
        {message}
      </div>
    </div>
  );
}