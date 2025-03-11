import { Book } from "../types/book.types"
import { NavLink } from 'react-router-dom';

//Interface för propsen som komponenten tar emot
interface BookProps {
  book: Book;
};

//Child som tar emot props enligt interface BlogProps samt Blog
const BookArticleProp: React.FC<BookProps> = ({ book }) => {

  //Returnerar blogginlägg som visas på startsidan, singlePage samt FollowUserPage
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
            <button className="button mt-2">Läs mer</button>
            <button className="button mt-2"><NavLink to={"/YourReviewPage/" + book.id}>Mina recensioner</NavLink></button>
            <span className="icon-text mt-3 ml-2">
              <span className="icon">
                <i className="fa-regular fa-thumbs-up"></i>
              </span>
              <span>Gilla</span>
            </span>
            <span className="icon-text mt-3 ml-2">
              <span className="icon">
                <i className="fa-regular fa-eye"></i>
              </span>
              <span>Visningar</span>
            </span>
            <span className="icon-text mt-3 ml-2">
              <span className="icon">
                <i className="fa-regular fa-bookmark"></i>
              </span>
              <span>Bokmärke</span>
            </span>
          </div>

        </div>
      </div>
    </>
  )
}

export default BookArticleProp