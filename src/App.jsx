import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import DemoCarousel from "./components/Carousel";
import Homepage from "./components/Homepage";
import ShowDetails from "./components/ShowDetails";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <DemoCarousel />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/podcast/:id" element={<ShowDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
