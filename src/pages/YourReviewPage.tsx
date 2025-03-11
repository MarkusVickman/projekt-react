
import React, { useEffect, useState } from "react"
import { useReview } from "../context/ReviewContext";
import { Review, PostReview } from "../types/review.types"
import { useAuth } from "../context/AuthContext";
import ReviewAdminProp from "../components/ReviewAdminProp";

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

  // Formulärhantering
  const [formHeader, setFormHeader] = useState('Nytt inlägg');
  const [id, setId] = useState<number | null>(null);
  const date = (new Date().toLocaleDateString());
  const [error, setError] = useState('');

  //Läser in alla inlägg
  useEffect(() => {
    getReviews();
  }, []);

  //Resettar komponenten när bloginläggen uppdateras
  useEffect(() => {
    setNewAbout('');
    setNewHeading('');
    setId(null);
    setFormHeader("Nytt inlägg");
  }, [reviews]);

  //Vid submit testas inmatning sen skickas det nya inlägget
  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (checkInput()) {
      const newReview: PostReview = {
        heading: newHeading,
        about: newAbout,
        bookId: newBookId,
        score: newScore,
        views: newViews,
        likes: newLikes
      }
      postReview(newReview);
    }
  }

  //Vid put-submit testas inmatning sen skickas inlägget
  const submitPut = async () => {

    if (checkInput()) {
      const newReview: PostReview = {
        heading: newHeading,
        about: newAbout,
        bookId: newBookId,
        score: newScore,
        views: newViews,
        likes: newLikes
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
    setId(null);
    setFormHeader("Nytt inlägg");
  }

  //Fyller i formuläret med review-objektet
  const fillForm = (review: Review) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setNewAbout(review.about);
    setNewHeading(review.heading);
    setId(review.id);
    setFormHeader("Redigera inlägg: " + review.id);
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
    <>
      <div className="container mt-4">
        <h1 className="title ">Hantera dina bokrecensioner</h1>

        <h2 className="title mt-5">{formHeader}</h2>
        <form className="card" onSubmit={submitPost}>

          <div className="card-header">
            <input className="card-header-title input" type="text" id="newheading" placeholder="Titel.." required value={newHeading} onChange={(e) => setNewHeading(e.target.value)} />
          </div>

          <div className="card-content">
            <input className="input" type="text" id="newabout" placeholder="Skriv här.." required value={newAbout} onChange={(e) => setNewAbout(e.target.value)} />
            <b><time className="is-size-7 is-pulled-right">{date}</time></b>
          </div>

          <div className="card-footer">
            {!id ? (
              <button className="card-footer-item has-text-weight-bold" type="submit">
                Spara
              </button>
            ) :
              <>
                <button className="card-footer-item has-text-weight-bold" onClick={submitPut}>
                  Ändra
                </button>
                <button className="card-footer-item has-text-weight-bold" onClick={cancelPut}>
                  Avbryt
                </button>
              </>
            }
          </div>
          {error && (
            <div>
              {error}
            </div>
          )}
        </form>
      </div>

      {/* skriver ut aktiva användarens flöde */}
      <div className="container mt-5">
        <h2 className="title">Dina recensioner</h2>
        {userReviews.map((review: Review) => (<ReviewAdminProp review={review} key={review.id} submitDelete={submitDelete} fillForm={fillForm} />))}
      </div>

      {/* Om aktiva användaren är en admin så skrivs alla inlägg ut som också går att redigera samt ta bort */}
      {user && user.isAdmin ? (
        <div className="container mt-5">
          <h2 className="title">Admin</h2>
          {reviews.map((review: Review) => (<ReviewAdminProp review={review} key={review.id} submitDelete={submitDelete} fillForm={fillForm} />))}
        </div>
      ) : null}
    </>
  )
}

export default YourReviewPage
