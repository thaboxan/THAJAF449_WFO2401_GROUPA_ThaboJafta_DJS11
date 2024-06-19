import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import DemoCarousel from "./components/Carousel";
import Homepage from "./components/Homepage";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <DemoCarousel />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
