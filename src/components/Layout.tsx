import Header from "./Header"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import './Layout.css';

//Appens visningsstruktur. Här infogas header(meny), huvudinnehåll som väljs i routing samt footer.
const Layout = () => {
  return (
    <>
      <div className='page-container'>
        <div className="page-height-without-footer">
          <Header />
          <main>
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Layout
