
import { useEffect, useState } from "react"
import { useReview } from "../context/ReviewContext";
import { Review } from "../types/review.types"
import { useAuth } from "../context/AuthContext";
import ReviewAdminProp from "../components/ReviewAdminProp";
import ReviewForm from "../components/ReviewForm";

const YourReviewPage = () => {

  /*-läser in funktioner och data från ReviewContext -formulärdata*/
  const { userReviews, getReviews, reviews, deleteReview } = useReview();
  const { user } = useAuth();
  const [review, setReview] = useState<Review | null>(null);

  //Läser in alla recensioner
  useEffect(() => {
    getReviews();
  }, []);

  //Resettar komponenten när review uppdateras
  useEffect(() => {
  }, [review]);

  //Ändrar vilket review object som ska följa med till recensionsformuläret
  const editReviewData = (review: Review) => {
    setReview(null);

    setTimeout(() => {
      setReview(review);
    }, 0);
  };

  //Vid delete tas en recension bort
  const submitDelete = async (id: number) => {
    if (id !== null) {
      deleteReview(id);
    }
  }

  // returneras om review inte kan laddas in
  if (!reviews || !userReviews) {
    return (<>
      <h1 className="title">Dina recensioner</h1>
      <p><b>Laddar recensioner...</b></p>
    </>)
  }

  /* Ett formulär som kan posta nya recensioner eller redigera gamla. Knappar samt text ändras dynamiskt */
  // även alla recensioner skrivs ut
  return (
    <>

      {review && <ReviewForm review={review} bookId={null} subTitle={review.subTitle} />}

      {/* skriver ut aktiva användarens flöde */}
      < div className="container mt-5" >
        <h1 className="title has-text-centered">Dina recensioner</h1>
        {userReviews.map((review: Review) => (<ReviewAdminProp review={review} key={review.id} submitDelete={submitDelete} fillForm={editReviewData} />))}
      </div >

      {/* Om aktiva användaren är en admin så skrivs alla inlägg ut som också går att redigera samt ta bort */}
      {
        user && user.isAdmin ? (
          <div className="container mt-5">
            <h2 className="title has-text-centered">Admin</h2>
            {reviews != null &&
              reviews.map((review: Review) => (<ReviewAdminProp review={review} key={review.id} submitDelete={submitDelete} fillForm={editReviewData} />))}
          </div>
        ) : null
      }
    </>
  )
}

export default YourReviewPage
