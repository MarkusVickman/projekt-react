
import { useEffect, useState } from "react"
import { useReview } from "../context/ReviewContext";
import { Review } from "../types/review.types"
import { useAuth } from "../context/AuthContext";
import ReviewAdminProp from "../components/ReviewAdminProp";
import ReviewForm from "../components/ReviewForm";

const YourReviewPage = () => {

  /*
  -läser in funktioner och data från BookContext
  -formulärdata
  */
  const { userReviews, getReviews, reviews, deleteReview } = useReview();
  const { user } = useAuth();
  const [review, setReview] = useState<Review | null>(null);

  //Läser in alla inlägg
  useEffect(() => {
    getReviews();
  }, []);


  //Resettar komponenten när bloginläggen uppdateras
  useEffect(() => {
    console.log(review);
  }, [review]);

  const editReviewData = (review: Review) => {
    setReview(null);

    setTimeout(() => {
      setReview(review);
    }, 0);
  };

  //Vid delete tas inlägget bort
  const submitDelete = async (id: number) => {
    if (id !== null) {
      deleteReview(id);
    }
  }

  // returneras om inläggen inte kan laddas in
  if (!reviews || !userReviews) {

    return (<>
      <h1 className="title">Dina recensioner</h1>
      <p><b>Laddar recensioner...</b></p>;
    </>)
  }

  /* Ett formulär som kan posta nya inlägg eller redigera gamla. Knappar samt text ändras dynamiskt */
  return (


    <>
      {<ReviewForm review={review} bookId={null} />}


      {/* skriver ut aktiva användarens flöde */}
      < div className="container mt-5" >
        <h1 className="title">Dina recensioner</h1>
        {userReviews.slice() // Skapar en kopia av arrayen för att inte mutera originalet
          .sort((a: Review, b: Review) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sorterar baserat på datum (nyaste först)
          .map((review: Review) => (<ReviewAdminProp review={review} key={review.id} submitDelete={submitDelete} fillForm={editReviewData} />))}
      </div >

      {/* Om aktiva användaren är en admin så skrivs alla inlägg ut som också går att redigera samt ta bort */}
      {
        user && user.isAdmin ? (
          <div className="container mt-5">
            <h2 className="title">Admin</h2>
            {reviews != null &&
              reviews
                .slice() // Skapar en kopia av arrayen för att inte mutera originalet
                .sort((a: Review, b: Review) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sorterar baserat på datum (nyaste först)
                .map((review: Review) => (<ReviewAdminProp review={review} key={review.id} submitDelete={submitDelete} fillForm={editReviewData} />))}
          </div>
        ) : null
      }
    </>
  )
}

export default YourReviewPage
