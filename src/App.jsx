import { BrowserRouter, Routes, Route } from "react-router-dom";

import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Nutrition from "./pages/Nutrition";
import CycleTracker from "./pages/CycleTracker";
import MoodTracker from "./pages/MoodTracker";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route 
          path="/" 
          element={<Home />} 
        />


        <Route 
          path="/dashboard" 
          element={<Dashboard />} 
        />


        <Route 
          path="/chat" 
          element={<Chat />} 
        />


        <Route 
          path="/cycle" 
          element={<CycleTracker />} 
        />


        <Route 
          path="/mood" 
          element={<MoodTracker />} 
        />


        <Route 
          path="/reports" 
          element={<Reports />} 
        />
        <Route 
          path="/nutrition" 
          element={<Nutrition />} 
        />
        <Route path="/profile" element={<Profile />} />

      </Routes>

    </BrowserRouter>

  );
}