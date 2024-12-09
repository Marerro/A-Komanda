import { useState } from "react";
import Navigation from "./Navigation";
import RecommendedForYou from "./RecommendedForYou";
import Trending from "./Trending";
import Searchbar from "./Searchbar";

export default function Home() {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <>
      <Navigation />
      <Searchbar
        showComponent={showComponent}
        setShowComponent={setShowComponent}
      />

      {!showComponent && <Trending />}
      {!showComponent && <RecommendedForYou />}
    </>
  );
}
