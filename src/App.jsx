import { Route, Routes } from "react-router";
import LogInPage from "./components/LogInPage";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";
const LazySignUpPage = lazy(()=> import ("./components/SignUpPage"))
const LazyHome = lazy(()=> import ("./components/Home"))
const LazyMovies = lazy(()=>import("./components/Movies"))
const LazyTvSeries = lazy(()=> import("./components/TvSeries") )
const LazyBookmarks = lazy(()=> import("./components/Bookmarks") )


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Suspense fallback={<Loading/>}><LogInPage /></Suspense>} />
        <Route path="/login" element={<Suspense fallback={<Loading/>}><LogInPage /></Suspense>} />
        <Route path="/signup" element={<Suspense fallback={<Loading/>}><LazySignUpPage /></Suspense>} />
        <Route path="/home" element={<Suspense fallback={<Loading/>}><LazyHome /></Suspense>} />
        <Route path="/movies" element={<Suspense fallback={<Loading/>}><LazyMovies /></Suspense>} />
        <Route path="/tvseries" element={<Suspense fallback={<Loading/>}><LazyTvSeries /></Suspense>} />
        <Route path="/bookmarks" element={<Suspense fallback={<Loading/>}><LazyBookmarks /></Suspense>} />
      </Routes>
    </>
  );
}
export default App;
