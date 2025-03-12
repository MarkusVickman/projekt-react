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
    const [books, setBooks] = useState<Book[] | null>(null);


    // Kontrollerar om användaren har en giltig token
    const bookSearch = async (search: string) => {

        console.log("SearchTerm: " + search);

        try {
            const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.ok) {
                const data = await res.json();



                // Mappa hela arrayen av böcker till ditt Book-interface
                const mappedBooks: Book[] = data.items.map((item: any) => ({
                    id: item.id,
                    title: item.volumeInfo.title,
                    subtitle: item.volumeInfo.subtitle || null,
                    publisher: item.volumeInfo.publisher,
                    pageCount: item.volumeInfo.pageCount || 0,                    
                    description: item.volumeInfo.description || "",
                    thumbnail: item.volumeInfo.imageLinks?.thumbnail || null,
                    language: item.volumeInfo.language,
                    authors: item.volumeInfo.authors || [],
                    categories: item.volumeInfo.categories || [],
                    publishedDate: item.volumeInfo.publishedDate,
                    isbn: item.volumeInfo.industryIdentifiers
                }));

                console.log(mappedBooks);
                setBooks(mappedBooks); 
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
        <BookContext.Provider value={{ books, bookSearch }}>
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

