
//Interface för reviewinlägg som ska skivas ut
export interface Review {
    id: number,
    bookId: string,
    heading: string,
    subTitle: string,
    date: Date,
    about: string,
    score: number,
    likes: number,
    views: number,
    email: string,
    name: string
}

//Interface för att posta och ändra recension
export interface PostReview {
    bookId: string,
    heading: string,
    subTitle: string | null,
    about: string,
    score: number
   // likes: number | null,
   // views: number | null
}

//Interface för att dela reviewContext med dess metoder och interfaces till sidor och komponenter
export interface ReviewContextType {
    reviews: Review[] | null,
    getReviews: () => void,    
    postReview: (review: PostReview) => void,
    putReview: (review: PostReview, id: number) => void,
    deleteReview: (id: number) => void,
    userReviews: Review[] | null,
    likeReview: (id: number) => void
}

