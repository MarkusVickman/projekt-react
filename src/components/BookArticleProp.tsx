import { Book } from "../types/book.types"

//Interface för propsen som komponenten tar emot
interface BookProps {
  book: Book;
};

//Child som tar emot props enligt interface BookProps samt Book
const BookArticleProp: React.FC<BookProps> = ({ book }) => {

  //Returnerar större bokinlägg som visas på SingleBookPage
  return (
    <>
      <div className="card" key={book.id} title="Recensioner och läs mer">
        <div className="card-content mt-6">
          <div className="media">
            <div className="media-left">
              <figure className="image">
                <img width="128"
                  src={book.thumbnail}
                  alt="Omslagsbild"
                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">{book.title}</p>
              <p className="subtitle is-6">{book.subtitle}</p>
              <div className="content">
                <ul>
                  <li>Författare: {book.authors.join(", ")}</li>
                  <li>Sidor: {book.pageCount}</li>
                  <li>Språk: {book.language}</li>
                  <li>Utgiven: {book.publishedDate}</li>
                  <li>Kategori: {book.categories}</li>
                  <li>Bokförlag: {book.publisher}</li>
                  <li>
                    ISBN:
                    <ul>
                      {book.isbn?.map((isbnEntry, index) => (
                        <li key={index}>
                          {isbnEntry.type}: {isbnEntry.identifier}
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="content">{book.description}</div>
        </div>
      </div>
    </>
  )
}

export default BookArticleProp