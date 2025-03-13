import { createContext, useState, useContext, ReactNode } from "react";
import { Book, BookContextType } from "../types/book.types";

// Initierar BookContext
const BookContext = createContext<BookContextType | null>(null);

// Interface för Bookprovider
export interface BookProviderProps {
    children: ReactNode
}

// exporterar en komponent med namnet BookProvider
export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {

    // initierar books
    const [books, setBooks] = useState<Book[] | null>(null);

    // Metod som tar in en söksträng innehållandes både sökord och prefix för ifall det är sök eller för att besöka specifik bok
    const bookSearch = async (search: string) => {

        try {
            const res = await fetch(`https://www.googleapis.com/books/v1/volumes${search}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.ok) {
                const data = await res.json();

                if (search.startsWith("?")) {
                    // Mappa hela arrayen av böcker till ditt Book-interface om det är en sökning
                    const mappedBooks: Book[] = data.items.map((item: any) => ({
                        id: item.id || "Ingen ID",
                        title: item.volumeInfo.title || "Titel saknas",
                        subtitle: item.volumeInfo.subtitle || "Ingen undertitel",
                        publisher: item.volumeInfo.publisher || "Utgivare saknas",
                        pageCount: item.volumeInfo.pageCount || 0,
                        description: item.volumeInfo.description || "Beskrivning saknas",
                        thumbnail: item.volumeInfo.imageLinks?.thumbnail || "Ingen bild",
                        language: item.volumeInfo.language || "Språk saknas",
                        authors: item.volumeInfo.authors || ["Författare saknas"],
                        categories: item.volumeInfo.categories || ["Kategori saknas"],
                        publishedDate: item.volumeInfo.publishedDate || "Publiceringsdatum saknas",
                        isbn: item.volumeInfo.industryIdentifiers || []
                    }));
                    setBooks(mappedBooks);
                } else {
                    // Mappa en bok till ditt Book-interface om det är en specifik bok som efterfrågas
                    const mappedBook: Book = {
                        id: data.id || "Ingen ID",
                        title: data.volumeInfo?.title || "Titel saknas",
                        subtitle: data.volumeInfo?.subtitle || "Ingen undertitel",
                        publisher: data.volumeInfo?.publisher || "Utgivare saknas",
                        pageCount: data.volumeInfo?.pageCount || 0,
                        description: data.volumeInfo?.description || "Beskrivning saknas",
                        thumbnail: data.volumeInfo?.imageLinks?.thumbnail || "Ingen bild",
                        language: data.volumeInfo?.language || "Språk saknas",
                        authors: data.volumeInfo?.authors || ["Författare saknas"],
                        categories: data.volumeInfo?.categories || ["Kategori saknas"],
                        publishedDate: data.volumeInfo?.publishedDate || "Publiceringsdatum saknas",
                        isbn: data.volumeInfo?.industryIdentifiers || []
                    };
                    setBooks([mappedBook]);
                }
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    }

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

