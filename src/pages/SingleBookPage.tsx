import { useBook } from "../context/BookContext";
import { useParams } from "react-router-dom";
import BookArticleProp from "../components/BookArticleProp";
import { Book } from "../types/book.types"

// Sida/komponent för visning av en bok
const SingleBookPage = () => {

    // Läser in html-parameter
    const { bookId } = useParams();

    //Hämtar alla inlägg
    const { books } = useBook();

    //Om inläggen inte hunnits ladda eller inte kan ladda.
    if (!books) {
        return <>
            <h1 className="title">En bok</h1>
            <p><b>Boken laddas...</b></p>
        </>
    }

    // Hitta det första objektet med matchande id
    const item: Book | undefined = books.find(item => item.id === bookId);

    //Om id är felaktigt eller inte hittas
    if (!item) {
        return (
            <>
                <h1 className="title">En bok</h1>
                <p><b>Boken kunde inte laddas...</b></p>
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
        </>
    )
}

export default SingleBookPage
