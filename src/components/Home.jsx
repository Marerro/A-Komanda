import Navigation from "./Navigation";
import RecommendedForYou from "./RecommendedForYou";
import Trending from "./Trending";
import Searchbar from "./Searchbar";

export default function Home() {
  return (
    <>
      <Navigation />
      <Searchbar />
      <Trending />
      <RecommendedForYou />
    </>
  );
}
