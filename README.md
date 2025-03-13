# React Projekt - Easy book reviews
Applikationen är en recensionsplattform för böcker. Boksökningar går att göra hos google books api. Dessa böcker går sedan att recensera där recensionerna sparas i en MySQL-databas genom en NEST.js backend. Plattformen även ett inloggningssytem.

* Det går att gå in på specifika böcker för mer information 
* Läsa alla recensioner och gilla recensioner 
* Det går även att ladda upp och redigera recensioner på skyddad route
* Adminkonton kan ändra samt ta bort allas andras recensioner på skyddad route
* Det går att registrera nya konton. 

Besök webbplatsen [Easy book reviews](https://easy-book-reviews.netlify.app/).

## Lösning
Uppgiften gick ut på att skapa en react applikation programmerad i TypeScript för recensioner.

* BookContext används för Api-anrop till google books api.
* ReviewContext används för Api-anrop till nest.js backend för recensionshantering.
* AuthContext används för användar authentisering med api-anrop till samma nest.js backend.
* review.types.ts, book.types.ts och auth.types.ts används för interface
* Protected routes används för att skydda routes
* BookArticleProp.tsx, BookProp.tsx används för styling och struktur av böcker (Child)
* ReviewAdminProp.tsx, ReviewProp.tsx används för styling och struktur av recensioner (Child)
* ReviewForm.tsx används för styling och struktur av recensionsformuläret (Child)
* Routing.tsx används för att specifiera webbplatsens routes samt tilldela Context.

**Uppfyllt för överbetyg:**
* Det går att gilla recensioner
* Administratörsroll finns för att kunna ändra och ta bort andras inlägg

## Testkör lokalt
För att testa eller bygga vidare på projektet behöver repot klonas och kommandot ` npm install ` ska köras i terminalen.
För att testköra ` npm run dev `
För att publicera ` npm run build `

**Markus Vickman**
**MAVI2302**
