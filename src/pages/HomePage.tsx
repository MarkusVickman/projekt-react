
import { useEffect, useState } from "react"
import { useReview } from "../context/ReviewContext";
import { Book } from "../types/book.types"
import BookProp from "../components/BookProp";
import { useBook } from "../context/BookContext";
import { Review } from "../types/review.types";
import ReviewProp from "../components/ReviewProp";

const HomePage = () => {

  // läser in funktioner och data från ReviewContext
  const { reviews, getReviews } = useReview();
  const { books, bookSearch } = useBook();
  const [newSearch, setNewSearch] = useState<string>("");
  const [showBooks, setShowBooks] = useState<boolean>(true);
  const [showLiked, setShowLiked] = useState<boolean>(false);
  // Läser in alla inlägg
  useEffect(() => {
    getReviews();
  }, []);


  const toggleLiked = () => {
    setShowLiked(true);
    setShowBooks(false);
  }

  const toggleBooks = () => {
    setShowBooks(true);
    setShowLiked(false);
  }

  // returneras om inläggen inte kan laddas in
  //if (!review) {
  return <div className="container">
    <div className="buttons has-addons is-centered mt-6">
      <button className="button is-rounded is-info" onClick={toggleBooks}>Sök bok</button>
      <button className="button is-rounded is-info" onClick={toggleLiked}>Gillade recensioner</button>
    </div>

    {showBooks && (<><h1 className="title mt-6 has-text-centered">Sök bok</h1>
      <div className="container mt-6">
        <input className="input is-rounded is-medium is-focused" type="text" placeholder="Sök" onChange={(e) => setNewSearch(e.target.value)} />
        <div className="buttons is-centered mt-4">
          <button className="button is-rounded is-link is-medium" onClick={() => bookSearch(newSearch)}>Sök bok</button>
        </div>
      </div>

      {books != null && books.map((book: Book) => <BookProp book={book} key={book.id} />)}
    </>
    )}


    {showLiked && (
      <>
        <h1 className="title mt-6 has-text-centered">Mest gillade recensioner</h1>
        {reviews != null &&
          reviews
            .slice() // Skapar en kopia av arrayen för att inte mutera originalet
            .sort((a: Review, b: Review) => b.likes - a.likes) // Sorterar efter flest likes (störst först)
            .map((review: Review) => <ReviewProp review={review} key={review.id} />)}
      </>
    )}


  </div>


  //}

  //Returnerar alla inlägg i flödet
  return (
    <>

    </>
  )
}

export default HomePage