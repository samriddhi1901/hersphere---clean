const questions = [
  "Why is my period late?",
  "What are PCOS symptoms?",
  "Foods rich in iron",
  "How to reduce cramps?",
  "Can stress delay periods?",
  "What causes mood swings?",
];

export default function SuggestedQuestions({ onSelect }) {
  return (
    <div className="mt-6">
      <h2 className="font-semibold text-lg mb-4">
        💡 Suggested Questions
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {questions.map((q) => (
          <button
            key={q}
            onClick={() => onSelect(q)}
            className="text-left bg-white rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-pink-400 border border-transparent transition"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}