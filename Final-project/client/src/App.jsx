import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Feature from "./pages/Feature";

import AddJob from "./pages/AddJob";
import EditJob from "./pages/Editjob";
import SingleJob from "./pages/SingleJob";



const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />

         

          <Route path="/add-job" element={<AddJob />} />
          <Route path="/edit-job/:id" element={<EditJob />} />
          <Route path="/job/:id" element={<SingleJob />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/f" element={<Feature />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
};

export default App;