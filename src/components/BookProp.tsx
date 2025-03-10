import { Book } from "../types/book.types"
import { NavLink } from 'react-router-dom';

//Interface för propsen som komponenten tar emot
interface BookProps {
  book: Book;
};

//Child som tar emot props enligt interface BlogProps samt Blog
const BookProp: React.FC<BookProps> = ({ book }) => {

  //Returnerar blogginlägg som visas på startsidan, singlePage samt FollowUserPage
  return (
    <>

      <div className="card" key={book.id}>
        <div className="card-content mt-6">
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
    </>
  )
}

export default BookProp