import { Heart, Mail, MessageCircle, Link2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-pink-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center">
                <Heart className="text-white w-5 h-5 fill-white" />
              </div>
              <span className="text-xl font-extrabold text-gray-900">HerSphere</span>
            </div>
            <p className="text-gray-600 text-sm leading-6">
              AI-powered wellness companion helping women understand,
              track, and improve their health journey.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#features" className="hover:text-pink-600">Features</a></li>
              <li><a href="#ai" className="hover:text-pink-600">AI Assistant</a></li>
              <li><a href="#topics" className="hover:text-pink-600">Health Topics</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#testimonials" className="hover:text-pink-600">Testimonials</a></li>
              <li><a href="#faq" className="hover:text-pink-600">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center hover:bg-pink-100">
                <Mail className="w-4 h-4 text-pink-600" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center hover:bg-pink-100">
                <MessageCircle className="w-4 h-4 text-pink-600" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center hover:bg-pink-100">
                <Link2 className="w-4 h-4 text-pink-600" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-100 mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} HerSphere. Built with care by Samriddhi Shrivastava.
        </div>
      </div>
    </footer>
  );
}
