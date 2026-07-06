import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/cycle" element={<CycleTracker />} />
      </Routes>
    </BrowserRouter>
  );
}