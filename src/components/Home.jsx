import Navigation from "./Navigation";
import RecommendedForYou from "./RecommendedForYou";
import Trending from "./Trending";

export default function Home() {
  return (
    <>
      <Navigation />
      <Trending />
      <RecommendedForYou />
    </>
  );
}
