
//Interface för reviewinlägg som ska skivas ut
export interface Review {
    id: number,
    bookId: string,
    heading: string,
    date: Date,
    about: string,
    score: number | null,
    likes: number | null,
    views: number | null,
    email: string,
    name: string
}

//Interface för att posta och ändra recension
export interface PostReview {
    bookId: string,
    heading: string,
    about: string,
    score: number | null,
    likes: number | null,
    views: number | null
}

//Interface för att dela reviewContext med dess metoder och interfaces till sidor och komponenter
export interface ReviewContextType {
    reviews: Review[] | null,
    allReviews: () => void,    
    postReview: (review: PostReview) => void,
    putReview: (review: PostReview, id: number) => void,
    deleteReview: (id: number) => void,
    userReviews: Review[] | null
}

