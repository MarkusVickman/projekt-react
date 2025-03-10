//Interface för reviewinlägg som ska skivas ut
export interface Review {
    id: number,
    heading: string,
    date: Date,
    about: string,
    email: string,
    name: string
}

//Interface för att posta och ändra inlägg
export interface PostReview {
    heading: string,
    about: string,
}

//Interface för att dela reviewContext med dess metoder och interfaces till sidor och komponenter
export interface ReviewContextType {
    review: Review[] | null   
}

