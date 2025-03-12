import { useBook } from "../context/BookContext";
import { useParams } from "react-router-dom";
import BookArticleProp from "../components/BookArticleProp";
import { Book } from "../types/book.types"
import { useEffect, useState } from "react";
import { Review } from "../types/review.types";
import ReviewProp from "../components/ReviewProp";
import { useReview } from "../context/ReviewContext";
import ReviewForm from "../components/ReviewForm";

// Sida/komponent för visning av en bok
const SingleBookPage = () => {

    // Läser in html-parameter
    const { bookId } = useParams();

    //Hämtar alla inlägg
    const { books, bookSearch } = useBook();
    const { getReviews, reviews } = useReview();

    let item: Book | undefined = books?.find(item => item.id === bookId);

    //Läser in alla inlägg
    useEffect(() => {
        getReviews();

        if (typeof bookId === "string" /*&& !item */&& books) {
            // Återsök böcker om state är tomt
            bookSearch(bookId); // Skicka en sökfråga om
            item = books.find(item => item.id === bookId);
        }
    }, []);
    

   

/*
    if (typeof bookId === "string" && !item && books) {
        // Återsök böcker om state är tomt
        bookSearch(bookId); // Skicka en sökfråga om nödvändigt
        item = books.find(item => item.id === bookId);
    }
*/
    // Lagra alla recensioner som matchar bookId
    let bookReviews: Review[] = reviews?.filter((item: Review) => item.bookId === bookId) || [];

    //Om id är felaktigt eller inte hittas
    if (!item) {
        return (
            <>
                <h1 className="title">En bok</h1>
                <p><b>Boken laddas...</b></p>
            </>
        );
    }

    //Returnerar ett inlägg
    return (
        <>
            <div className="container mt-5">
                <h2 className="title">En bok</h2>
                {item && <BookArticleProp book={item} key={item.id} />}
            </div>

            {<ReviewForm review={null} bookId={item.id} />}

            {/* skriver ut aktiva användarens flöde */}
            < div className="container mt-5" >
                <h1 className="title">Recensioner</h1>
                {bookReviews.map((review: Review) => (<ReviewProp review={review} key={review.id} />))}
            </div >
        </>
    )
}

export default SingleBookPage
