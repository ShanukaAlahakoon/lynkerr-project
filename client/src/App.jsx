import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Feed from "./pages/Feed.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import ListingDetails from "./pages/ListingDetails.jsx";
import MyListings from "./pages/MyListing.jsx";
import EditListing from "./pages/EditListing.jsx";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateListing />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/edit/:id" element={<EditListing />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
