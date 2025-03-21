import { Book } from "../types/book.types"
import { NavLink } from 'react-router-dom';

//Interface för propsen som komponenten tar emot
interface BookProps {
  book: Book;
};

//Child som tar emot props enligt interface BookProps samt Book
const BookProp: React.FC<BookProps> = ({ book }) => {

  //Returnerar korta bokinlägg som visas på startsidan
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
                </ul>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <NavLink to={"/SingleBookPage/" + book.id} className="card-footer-item button mt-2">Läs mer</NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookProp