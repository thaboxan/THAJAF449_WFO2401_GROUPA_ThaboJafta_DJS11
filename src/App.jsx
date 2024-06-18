import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import DemoCarousel from "./components/Carousel";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <DemoCarousel />
      </div>
    </BrowserRouter>
  );
}
