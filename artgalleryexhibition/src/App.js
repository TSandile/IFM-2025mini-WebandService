// import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import DefaultHeader from "./components/headers/defaultHeader";
import Home from "./pages/Home";
import AllExhibition from "./pages/AllExhibition";
import AllArtPiece from "./pages/AllArtPiece";
import AllArtist from "./pages/AllArtist";

import "bootstrap/dist/css/bootstrap.min.css";
//import ArtistManage from "./pages/artist/ArtistManage";
import AddArtist from "./pages/artist/AddArtist";
import AddArtPiece from "./pages/artPiece/AddArtPiece";
import AddExhibition from "./pages/exhibition/AddExhibition";
import UpdateArtPiece from "./pages/artPiece/UpdateArtPiece";
import DeleteArtPiece from "./pages/artPiece/DeleteArtPiece";
import ManageArtPieces from "./pages/artPiece/ManageArtPieces";
import ManageArtist from "./pages/artist/ManageArtist";
import UpdateArtist from "./pages/artist/UpdateArtist";
import DeleteArtist from "./pages/artist/DeleteArtist";
import ManageExhibition from "./pages/exhibition/ManageExhibition";
import UpdateExhibition from "./pages/exhibition/UpdateExhibition";
import ExhibitionArtPiece from "./pages/exhibition/ExhibitionArtPiece";
import Register from "./pages/user/Register";
import Login from "./pages/user/login";
import AssignArtPiece from "./pages/exhibition/AssignArtPiece";

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
        <Route path="/addexhibition" element={<AddExhibition />} />
        {/* Owner management route pages */}
        <Route path="/manageArtpieces" element={<ManageArtPieces />} />
        <Route path="/updateArtPiece/:id" element={<UpdateArtPiece />} />
        <Route path="/deleteArtPiece/:id" element={<DeleteArtPiece />} />
        <Route path="/manageArtist" element={<ManageArtist />} />
        <Route path="/updateArtist/:id" element={<UpdateArtist />} />
        <Route path="/deleteArtist/:id" element={<DeleteArtist />} />
        <Route path="/manageExhibition" element={<ManageExhibition />} />
        <Route path="/updateExhibition/:id" element={<UpdateExhibition />} />
        <Route path="/deleteExhibition/:id" element={<ManageExhibition />} />
        <Route
          path="/exhibitionArtPiece/:id"
          element={<ExhibitionArtPiece />}
        />
        <Route path="/assignArtPiece/:id" element={<AssignArtPiece />} />

        {/* User registration and login route pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
