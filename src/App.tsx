import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "@pages/Landing";
import Play from "@pages/Play";
import FindMatch from "@pages/FindMatch";
import Navbar from "@components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/find-1v1" element={<FindMatch />} />
        <Route path="/play/:gameId" element={<Play />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}