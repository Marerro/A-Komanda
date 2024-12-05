
import Movies from "./components/Movies";



import { Route, Routes } from "react-router";
import Placeholder from "./components/Placeholder";

function App() {
  return (
    <>
   <Movies/>
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
