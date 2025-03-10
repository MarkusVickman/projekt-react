
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
  return <div className="container">
    <div className="buttons has-addons is-centered mt-6">
      <button className="button is-rounded is-info">Sök</button>
      <button className="button is-rounded is-info">Trendande</button>
      <button className="button is-rounded is-info">Gillade</button>
    </div>
    <h1 className="title mt-6 has-text-centered">Sök bok</h1>
    <div className="container mt-6">
      <input className="input is-rounded is-medium is-focused" type="text" placeholder="Rounded input" />
      <div className="buttons is-centered mt-4">
        <button className="button is-rounded is-link is-medium">Sök bok</button>
      </div>
    </div>
    <p><b>Reviewdata laddas in...</b></p>
  </div>
  //}

  //Returnerar alla inlägg i flödet
  return (
    <>

    </>
  )
}

export default HomePage