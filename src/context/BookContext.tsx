import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Book, BookContextType } from "../types/book.types";

// Initierar BookContext
const BookContext = createContext<BookContextType | null>(null);

// Interface för Bookprovider
export interface BookProviderProps {
    children: ReactNode
}

// exporterar en komponent med namnet BookProvider
export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {

    // initierar user
    const [book, setBook] = useState<Book | null>(null);

 
    // Kontrollerar om användaren har en giltig token
    const bookSearch = async (search: string) => {


        try {
            const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.ok) {
                const data = await res.json();
                /*setBook({
                    email: res.email,
                    name: res.name,
                    isAdmin: res.isAdmin,
                });*/
                console.log(data);
            }

        } catch (error) {
            console.log("Error: " + error);
        }
    }

    // Vid start av sidor som använder AuthContext kontrolleras användaren
   // useEffect(() => {
   // }, [])

    //Returnerar Context med funktioner samt data
    return (
        <BookContext.Provider value={{ book, bookSearch }}>
            {children}
        </BookContext.Provider>
    )
}

//Exporterar Context
export const useBook = (): BookContextType => {
    const context = useContext(BookContext);

    if (!context) {
        throw new Error("useBook måste användas inom en BookProvider")
    }

    return context;
}

