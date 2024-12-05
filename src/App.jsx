import { Route, Routes } from "react-router";
import Placeholder from "./components/Placeholder";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Placeholder />} />
        <Route path="/login" element={<Placeholder />} />
        <Route path="/signup" element={<Placeholder />} />
        <Route path="/home" element={<Placeholder />} />
        <Route path="/movies" element={<Placeholder />} />
        <Route path="/tvseries" element={<Placeholder />} />
        <Route path="/bookmarks" element={<Placeholder />} />
      </Routes>
    </>
  );
}
export default App;
