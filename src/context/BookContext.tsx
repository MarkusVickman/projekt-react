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
                    tumbnail: item.volumeInfo.imageLinks?.thumbnail || null,
                    language: item.volumeInfo.language,
                    authors: item.volumeInfo.authors || [],
                    categories: item.volumeInfo.categories || [],
                }));

                setBooks(mappedBooks); 

             /*   console.log(data.items);
                console.log(data.items[0].id);
                console.log(data.items[0].volumeInfo.title);
                console.log(data.items[0].volumeInfo.subtitle);
                console.log(data.items[0].volumeInfo.authors);
                console.log(data.items[0].volumeInfo.categories);
                console.log(data.items[0].volumeInfo.imageLinks.thumbnail);
                console.log(data.items[0].volumeInfo.language);
                console.log(data.items[0].volumeInfo.publisher);
                console.log(data.items[0].volumeInfo.pageCount);
                console.log(data.items[0].volumeInfo.publishedDate);        
               */ 
          
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

