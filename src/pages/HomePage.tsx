
import { useEffect, useState } from "react"
//import { useReview } from "../context/ReviewContext";
import { Review } from "../types/review.types"
import ReviewProp from "../components/ReviewArticleProp";
import { useBook } from "../context/BookContext";

const HomePage = () => {

  // läser in funktioner och data från ReviewContext
  //const { review, allReview } = useReview();
  const { book, bookSearch } = useBook();
  const [newSearch, setNewSearch] = useState<string>("");
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
      <input className="input is-rounded is-medium is-focused" type="text" placeholder="Sök" onChange={(e) => setNewSearch(e.target.value)} />
      <div className="buttons is-centered mt-4">
        <button className="button is-rounded is-link is-medium" onClick={() => bookSearch(newSearch)}>Sök bok</button>
        <button className="button is-rounded is-link is-medium">Sök gratisbok</button>
      </div>
    </div>

    <div className="card">

      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image">
              <img width="128"
                src="https://bulma.io/assets/images/placeholders/96x96.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">John Smith</p>
            <p className="subtitle is-6">@johnsmith</p>
          </div>
        </div>

        <div className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
          iaculis mauris. <a>@bulmaio</a>. <a href="#">#css</a>
          <a href="#">#responsive</a>
          <br />
          <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
      </div>
    </div>


  </div>
  //}

  //Returnerar alla inlägg i flödet
  return (
    <>

    </>
  )
}

export default HomePage