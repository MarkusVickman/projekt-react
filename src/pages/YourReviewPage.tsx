
import React, { useEffect, useState } from "react"
import { useReview } from "../context/ReviewContext";
import { Review, PostReview } from "../types/review.types"
import { useAuth } from "../context/AuthContext";
import ReviewAdminProp from "../components/ReviewAdminProp";
import { useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";

const YourReviewPage = () => {




  /*
  -läser in funktioner och data från BookContext
  -formulärdata
  */
  const { userReviews, getReviews, reviews, postReview, putReview, deleteReview } = useReview();
  const { user } = useAuth();
  const [newHeading, setNewHeading] = useState('');
  const [newAbout, setNewAbout] = useState('');
  const [newBookId, setNewBookId] = useState('');
  const [newLikes, setNewLikes] = useState<number>(0);
  const [newViews, setNewViews] = useState<number>(0);
  const [newScore, setNewScore] = useState<number>(0);
  const [review, setReview] = useState<Review | null>(null);

  // Formulärhantering
  const [formHeader, setFormHeader] = useState('Ny recension');
  const [id, setId] = useState<number | null>(null);
  const [error, setError] = useState('');

  // Läser in html-parameter
  const { bookId } = useParams();


  //Läser in alla inlägg
  useEffect(() => {
    getReviews();
    if (bookId) {
      setNewBookId(bookId);
    }
  }, []);


  //Resettar komponenten när bloginläggen uppdateras
  useEffect(() => {
    console.log(review);
  }, [review]);

  //Vid submit testas inmatning sen skickas det nya inlägget
  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (checkInput()) {
      const newReview: PostReview = {
        heading: newHeading,
        about: newAbout,
        bookId: newBookId,
        score: newScore,
        // views: newViews,
        // likes: newLikes
      }
      postReview(newReview);
    }
  }

  const editReviewData = (review: Review) => {
    setReview(null);

    setTimeout(() => {
      setReview(review);
    }, 0);
  };

  //Fyller i formuläret med review-objektet
  const fillForm = (review: Review) => {



    window.scrollTo({ top: 0, behavior: 'smooth' });
    setNewAbout(review.about);
    setNewHeading(review.heading);
    setNewBookId(review.bookId);
    setNewScore(review.score);
    setId(review.id);
    setFormHeader("Redigera recension: " + review.id);


  }




  //Vid put-submit testas inmatning sen skickas inlägget
  const submitPut = async () => {

    if (checkInput()) {
      const newReview: PostReview = {
        heading: newHeading,
        about: newAbout,
        bookId: newBookId,
        score: newScore,
        // views: newViews,
        // likes: newLikes
      }
      if (id !== null) {
        putReview(newReview, id);
      }
    }
  }

  //Vid delete tas inlägget bort
  const submitDelete = async (id: number) => {
    if (id !== null) {
      deleteReview(id);
    }
  }

  //Om en uppdatering avbryts återställs formuläret
  const cancelPut = () => {
    setNewAbout('');
    setNewHeading('');
    setNewBookId('');
    setNewScore(0);
    setId(null);
    setFormHeader("Ny recension");
  }



  //Metod som kontrollerar inmatningar och returnerar true om korrekt inmatat.
  const checkInput = () => {
    let validationErrors: boolean = true;
    let errorString = "";

    if (newHeading.length < 1) {
      validationErrors = false;

      errorString = "Inlägget måste ha en titel. ";
    }

    if (newAbout.length < 5) {
      validationErrors = false;

      errorString = errorString + "Inlägget måste vara minst 5 tecken långt. ";

    }

    //Bör byggas ut men inte nödvändigt för prof of concept
    if (newBookId.length < 2) {
      validationErrors = false;

      errorString = errorString + "Felaktigt bokid. ";

    }

    if (validationErrors) {
      setError("");
      return true
    } else {
      setError(errorString);
      return false
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



    /* bookId: string,
     heading: string,
     about: string,
     score: number | null,
     likes: number | null,
     views: number | null
 */


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
