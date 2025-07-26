import { createContext, useState, useContext, ReactNode } from "react";
import { Review, PostReview, ReviewContextType } from "../types/review.types";
import { User } from "../types/auth.types";
import { jwtDecode } from 'jwt-decode';

// Initierar ReviewContext
const ReviewContext = createContext<ReviewContextType | null>(null);

// Interface för reviewprovider
export interface ReviewProviderProps {
    children: ReactNode
}

// exporterar en komponent med namnet ReviewProvider
export const ReviewProvider: React.FC<ReviewProviderProps> = ({ children }) => {

    // initierar recensioner samt userReviews
    const [reviews, setReviews] = useState<Review[] | null>(null);
    const [userReviews, setUserReviews] = useState<Review[] | null>(null);

    //Api GET som hämtar in alla recensioner
    const getReviews = async () => {

        try {
            const res = await fetch("https://project-react-nest-backend.onrender.com/review/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (res.ok) {
                const data = await res.json() as Review[];

                let tempUserPost: Review[] = [];

                // Sorterar datan efter mest gillade och sedan datum
                const sortedData = data.sort((a, b) => b.likes - a.likes || new Date(b.date).getTime() - new Date(a.date).getTime());

                // Läser in och avkodar jwt om finns
                if (localStorage.getItem("youNeedThis")) {
                    const token = JSON.stringify(localStorage.getItem("youNeedThis"));
                    const decoded: User = jwtDecode(token);

                    //Filtrerar och lagrar aktiva användarens recensioner i en egen array 
                    sortedData.forEach(reviews => {
                        if (reviews.email === decoded.email) {
                            tempUserPost.push(reviews);
                        }
                    });
                    setUserReviews(tempUserPost);
                }
                setReviews(sortedData);
            }
        } catch (error) {
            throw error;
        }
    }

    //Skickar PUT som lägger till en like, kräver ok bearer samt id 
    const likeReview = async (id: number) => {
        const token = localStorage.getItem("youNeedThis");
        if (!token) {
            return;
        }
        try {
            const res = await fetch(`https://project-react-nest-backend.onrender.com/review/like/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            // Vid ok respons uppdateras review-data
            if (res.ok) {
                getReviews();
            }
        } catch (error) {
            console.log("Error: " + error);
        } finally {
        }
    }

    //Skickar POST med en ny recension, kräver ok bearer 
    const postReview = async (reviews: PostReview) => {
        const token = localStorage.getItem("youNeedThis");

        if (!token) {
            return;
        }
        try {
            const res = await fetch("https://project-react-nest-backend.onrender.com/review/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(reviews)
            })

            // Vid ok respons uppdateras review-data
            if (res.ok) {
                getReviews();
            }
        } catch (error) {
            console.log("Error: " + error);
        } finally {
        }
    }

    //Skickar PUT med ett uppdaterad recension, kräver ok bearer samt id 
    const putReview = async (reviews: PostReview, id: number) => {
        const token = localStorage.getItem("youNeedThis");

        if (!token) {
            return;
        }
        try {
            const res = await fetch(`https://project-react-nest-backend.onrender.com/review/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(reviews)
            })

            // Vid ok respons uppdateras review-data
            if (res.ok) {
                getReviews();
            }

        } catch (error) {
            console.log("Error: " + error);

        }
    }

    //Tar bort en recension med angivet id
    const deleteReview = async (id: number) => {
        const token = localStorage.getItem("youNeedThis");

        if (!token) {
            return;
        }
        try {
            const res = await fetch(`https://project-react-nest-backend.onrender.com/review/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            // Vid ok respons uppdateras review-data
            if (res.ok) {
                getReviews();
            }

        } catch (error) {
            console.log("Error: " + error);
        } finally {
        }
    }

    //Returnerar Context med funktioner samt data
    return (
        <ReviewContext.Provider value={{ getReviews, reviews, userReviews, postReview, putReview, deleteReview, likeReview }}>
            {children}
        </ReviewContext.Provider>
    )
}

//Exporterar Context
export const useReview = (): ReviewContextType => {
    const context = useContext(ReviewContext);

    if (!context) {
        throw new Error("useReview måste användas inom en ReviewProvider")
    }

    return context;
}


