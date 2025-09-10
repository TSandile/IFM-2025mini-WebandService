// import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import DefaultHeader from "./components/headers/defaultHeader";
import Home from "./pages/Home";
import AllExhibition from "./pages/AllExhibition";
import AllArtPiece from "./pages/AllArtPiece";
import AllArtist from "./pages/AllArtist";

import "bootstrap/dist/css/bootstrap.min.css";
import ArtistManage from "./pages/artist/ArtistManage";
import AddArtist from "./pages/artist/AddArtist";
import AddArtPiece from "./pages/artPiece/AddArtPiece";

// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <DefaultHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exhibitions" element={<AllExhibition />} />
        <Route path="/artpieces" element={<AllArtPiece />} />
        <Route path="/artists" element={<AllArtist />} />
        <Route path="/addartist" element={<AddArtist />} />
        <Route path="/addartpiece" element={<AddArtPiece />} />
      </Routes>
    </>
  );
}

export default App;
