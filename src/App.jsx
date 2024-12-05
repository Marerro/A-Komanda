import SignUpPage from "./components/SignUpPage";

import { Route, Routes } from "react-router";
import Placeholder from "./components/Placeholder";
import LogInPage from "./components/LogInPage";

function App() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<Placeholder />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/home" element={<Placeholder />} />
        <Route path="/movies" element={<Placeholder />} />
        <Route path="/tvseries" element={<Placeholder />} />
        <Route path="/bookmarks" element={<Placeholder />} />
      </Routes>
    </>
  );
}
export default App;
