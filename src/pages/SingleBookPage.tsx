import { useBook } from "../context/BookContext";
import { useParams } from "react-router-dom";
import BookArticleProp from "../components/BookArticleProp";
import { Book } from "../types/book.types"
import { useEffect } from "react";
import { Review } from "../types/review.types";
import ReviewProp from "../components/ReviewProp";
import { useReview } from "../context/ReviewContext";
import ReviewForm from "../components/ReviewForm";

// Sida/komponent för visning av en bok
const SingleBookPage = () => {

    // Läser in html-parameter
    const { bookId } = useParams();

    //Hämtar bok, alla recensioner och funktioner för att söka bok samt uppdatera recensioner
    const { books, bookSearch } = useBook();
    const { getReviews, reviews } = useReview();

    //Om boken fanns i senaste sökningen behöver ingen ny göras
    let item: Book | undefined = books?.find(item => item.id === bookId);

    //Läser in alla recensioner och letar reda på book in den inte redan var med i senaste sökningen.
    useEffect(() => {
        if (item === undefined) {
            getReviews();
            bookSearch("/" + bookId);
            item = books?.find(item => item.id === bookId);
        }
    }, []);

    // Lagra alla recensioner som matchar bookId
    let bookReviews: Review[] = reviews?.filter((item: Review) => item.bookId === bookId) || [];

    //Om id är felaktigt eller inte hittas
    if (!item) {
        return (
            <>
                <h1 className="title has-text-centered">En bok</h1>
                <p><b>Boken försöker laddas...</b></p>
            </>
        );
    }

    //Returnerar en större bokartikel samt alla tillhörande recensioner
    return (
        <>
            <div className="container mt-5">
                <h2 className="title has-text-centered">En bok</h2>
                {item && <BookArticleProp book={item} key={item.id} />}
            </div>

            {<ReviewForm review={null} bookId={item.id} subTitle={item.title} />}

            {/* skriver ut aktiva användarens flöde */}
            < div className="container mt-5" >
                <h1 className="title has-text-centered">Recensioner</h1>
                {bookReviews.map((review: Review) => (<ReviewProp review={review} key={review.id} />))}
            </div >
        </>
    )
}

export default SingleBookPage
