//Interface för book
export interface Book {
    id: string,
    title: string,
    subtitle: string | null,
    publisher: string,
    publishedDate: string,
    pageCount: number,
    isbn10: string | null,
    isbn13: string | null,
    description: string,
    thumbnail: string | undefined,
    language: string,
    authors: string[],
    categories: string[]
}


//Interface för att dela AuthContext med dess metoder och interfaces till sidor och komponenter
export interface BookContextType {
    books: Book[],
    bookSearch: (search: string) => Promise<void>;
}

