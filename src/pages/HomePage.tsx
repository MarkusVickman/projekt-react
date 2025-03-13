
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
  const [error, setError] = useState<string>("");

  // Läser in alla recensioner
  useEffect(() => {
    getReviews();
  }, []);

  // Används för att växla till att visa en lista över mest gillade recensioner 
  const toggleLiked = () => {
    setShowLiked(true);
    setShowBooks(false);
  }

  // Används för att växla till att visa boksök 
  const toggleBooks = () => {
    setShowBooks(true);
    setShowLiked(false);
  }

  // returnerar en sökfunktion av böcker och gillade recensioner
  return <div className="container">
    <div className="buttons has-addons is-centered mt-6">
      <button className="button is-rounded is-info" onClick={toggleBooks}>Sök bok</button>
      <button className="button is-rounded is-info" onClick={toggleLiked}>Gillade recensioner</button>
    </div>

    {showBooks && (<><h1 className="title mt-6 has-text-centered">Sök bok</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        // Kontrollera om fältet är ifyllt
        if (!newSearch || newSearch.trim() === "") {
          setError("Sökfältet måste fyllas i!");
          return;
        } else {
          setError("");
        }
        //Skickar med sök prefix + sökfras
        bookSearch("?q=" + newSearch);
      }} className="container mt-6">
        <input className="input is-rounded is-medium is-focused" type="text" placeholder="Sök" onChange={(e) => setNewSearch(e.target.value)} />
        <div className="buttons is-centered mt-4">
          <button className="button is-rounded is-link is-medium" type="submit">Sök bok</button>
        </div>
        <p className="has-text-danger has-text-centered">{error}</p>
      </form>

      {books != null && books.map((book: Book) => <BookProp book={book} key={book.id} />)}
    </>
    )}

    {showLiked && (
      <>
        <h1 className="title mt-6 has-text-centered">Mest gillade recensioner</h1>
        {reviews != null &&
          reviews.map((review: Review) => <ReviewProp review={review} key={review.id} />)}
      </>
    )}
  </div>
}

export default HomePage