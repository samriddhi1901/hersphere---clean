import { Sparkles } from "lucide-react";

export default function WelcomeBanner() {
  return (
    <div className="rounded-3xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 p-8 text-white shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="uppercase tracking-wider text-pink-100 text-sm">
            Your Personal Health Space
          </p>

          <h1 className="text-4xl font-bold mt-3">
            Good Afternoon 🌸
          </h1>

          <p className="mt-4 text-pink-100 max-w-xl">
            Welcome back! Keep track of your wellness, chat with AI,
            and stay informed about your health.
          </p>
        </div>

        <div className="hidden lg:flex h-24 w-24 rounded-full bg-white/20 items-center justify-center">
          <Sparkles size={42} />
        </div>
      </div>
    </div>
  );
}