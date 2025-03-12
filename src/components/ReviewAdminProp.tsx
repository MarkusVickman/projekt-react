import { NavLink } from "react-router-dom";
import { Review } from "../types/review.types";
import { format } from "date-fns";
import { sv } from "date-fns/locale";




//Interface för propsen som komponenten tar emot
interface ReviewProps {
    review: Review;
    fillForm: (review: Review) => void;
    submitDelete: (id: number) => void
};

//Child som tar emot props enligt interface ReviewProps samt Review och metoder
const ReviewAdminProp: React.FC<ReviewProps> = ({ review, fillForm, submitDelete }) => {

    //Returnerar styling och struktur för recensioner som visas på YourReviewPage med redigeringsmöjligheter
    return (
        <>


            <article className="card" key={review.id} title="Recension">
                <div className=" mt-6">
                    <div className="card-content">
                        <p className="title is-4 ">{review.heading}</p>
                        <p className="">
                            {review.about}
                        </p>
                    </div>

                    <div className="card-footer">
                        <span className="icon-text card-footer-item">
                            <span className="icon">
                                <i className="fa-regular fa-thumbs-up"></i>
                            </span>
                            <span>{review.likes}</span>
                        </span>
                        <span className="icon-text card-footer-item">
                            <span className="icon">
                                <i className="fa-regular fa-star"></i>
                            </span>
                            <span>{review.score}/5</span>
                        </span>
                        <p className="card-footer-item">{review.date.toString().split('T')[0]}</p>
                    </div>


                    <div className="card-footer">
                        <button className="card-footer-item" onClick={() => fillForm(review)}>Redigera</button>
                        <button className="card-footer-item" onClick={() => submitDelete(review.id)}>Ta bort</button>
                        <button className="card-footer-item"><NavLink to={"/SingleBookPage/" + review.bookId}>Visa Bok</NavLink></button>
                    </div>

                </div>
            </article>
        </>
    )
}

export default ReviewAdminProp