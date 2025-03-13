
// Sidan om webbplatsen
const AboutPage = () => {
  return (
    <section className="container">
      <h1 className="title mt-5 has-text-centered">Om Easy book reviews</h1>
      <p className="m-4">
        Välkommen till Easy book review. Vi är en mötesplats för bokälskare! Här kan du enkelt söka bland tusentals böcker med hjälp av Google Books API, utforska nya litterära äventyr och dela dina tankar med andra.
        </p>
      <p className="m-4">
        Du kan skriva recensioner för de böcker du älskar eller kanske skarpt ogillade, läsa vad andra tycker och ge en tumme upp till recensioner som inspirerar eller underhåller dig.
        Våra topplistor låter dig snabbt hitta de mest populära och uppskattade recensionerna.
      </p>   
      <p className="m-4">
        På baksidan drivs plattformen av modern teknik. Vår backend är byggd i Nest.js för säker och snabb hantering av data, medan frontend är skapad med React för en smidig och användarvänlig upplevelse. Adminverktygen säkerställer att innehållet håller hög kvalitet och att alla har en trygg plats att dela sina tankar.
      </p>
    </section>
  )
}

export default AboutPage