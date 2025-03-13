import { NavLink } from "react-router-dom";
import { Review } from "../types/review.types";
import { useReview } from "../context/ReviewContext";

//Interface för propsen som komponenten tar emot
interface ReviewProps {
    review: Review;
};

//Child som tar emot props enligt interface ReviewProps samt Review och metoder
const ReviewAdminProp: React.FC<ReviewProps> = ({ review }) => {

    const { likeReview } = useReview();

    //Returnerar styling och struktur för recensioner som visas på YourReviewPage med redigeringsmöjligheter
    return (
        <>
            <article className="card" key={review.id} title="Recension">
                <div className=" mt-6">
                    <div className="card-content">
                        <p className="title is-4 ">{review.heading}</p>
                        <p className="subtitle is-6">{review.subTitle}</p>
                        <p className="">
                            {review.about}
                        </p>
                    </div>

                    <div className="card-footer">
                        <div className="card-footer-item">
                            <button className="card-footer-item" onClick={() => likeReview(review.id)}>
                                <span className="icon-text  ml-2">
                                    <span>Gilla</span>
                                    <span className="icon">
                                        <i className="fa-regular fa-thumbs-up"></i>
                                    </span>
                                    <span>{review.likes}</span>
                                </span>
                            </button>
                            <span className="icon-text  ml-2 card-footer-item">
                                <span className="icon">
                                    <i className="fa-regular fa-star"></i>
                                </span>
                                <span>{review.score}/5</span>
                            </span>
                        </div>
                        <p className="card-footer-item">{review.date.toString().split('T')[0]}</p>
                        <NavLink to={"/SingleBookPage/" + review.bookId} className="card-footer-item"><button className="">Visa Bok</button></NavLink>
                    </div>
                </div>
            </article>
        </>
    )
}

export default ReviewAdminProp