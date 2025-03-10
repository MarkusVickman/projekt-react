
import { useEffect } from "react"
//import { useReview } from "../context/ReviewContext";
import { Review } from "../types/review.types"
import ReviewProp from "../components/ReviewArticleProp";

const HomePage = () => {

  // läser in funktioner och data från ReviewContext
  //const { review, allReview } = useReview();

  // Läser in alla inlägg
  /*useEffect(() => {
    allReview();
  }, []);*/

  // returneras om inläggen inte kan laddas in
  //if (!review) {
    return <>
      <h1 className="title">Easy book reviews</h1>
      <p><b>Reviewdata laddas in...</b></p>;
    </>
  //}

  //Returnerar alla inlägg i flödet
  return (
    <>

    </>
  )
}

export default HomePage