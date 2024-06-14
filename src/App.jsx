import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navbar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
