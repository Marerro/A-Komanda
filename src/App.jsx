import TvSeries from "./components/TvSeries"
import Movies from "./components/Movies";
import SignUpPage from "./components/SignUpPage";
import { Route, Routes } from "react-router";
import LogInPage from "./components/LogInPage";
import Home from "./components/Home";
import Bookmarks from "./components/Bookmarks";

function App() {
  return (
    <>
   
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvseries" element={<TvSeries />} />
        <Route path="/bookmarks" element={<Bookmarks />} />


      </Routes>
    </>
  );
}
export default App;
