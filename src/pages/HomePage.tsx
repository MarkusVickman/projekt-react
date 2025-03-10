
import { useEffect, useState } from "react"
//import { useReview } from "../context/ReviewContext";
import { Book } from "../types/book.types"
import BookProp from "../components/BookProp";
import { useBook } from "../context/BookContext";

const HomePage = () => {

  // läser in funktioner och data från ReviewContext
  //const { review, allReview } = useReview();
  const { books, bookSearch } = useBook();
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

    {books != null && books.map((book: Book) => <BookProp book={book} key={book.id} />)}

    
    </div>


  //}

  //Returnerar alla inlägg i flödet
  return (
    <>

    </>
  )
}

export default HomePage