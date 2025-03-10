import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import './Header.css';

const Header = () => {

    //Kontrollerar om användaren är inloggad för att kunna visa olika i menyn beroende på om inloggad eller ej
    const { user, logout } = useAuth();

    // Funktion för att öppna eller stänga mobilmenyn
    function toggleBurgerMenu() {
        document.querySelector('.navbar-menu')!.classList.toggle('is-active');
    }

    //Returnerar header med nav
    return (
        <header>

            {/* Navigering med ikon samt hamburgermeny */}
            <nav className="navbar" aria-label="main navigation">
                <div className="navbar-brand">
                    <NavLink to="/" className="navbar-item is-size-3 has-text-weight-bold">Easy book reviews</NavLink>

                    <a role="button" className="navbar-burger" onClick={toggleBurgerMenu} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                {/* Navigeringslänkar */}
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <NavLink to="/" className="navbar-item" onClick={toggleBurgerMenu}>Startsida</NavLink>
                        <NavLink to="/about" className="navbar-item" onClick={toggleBurgerMenu}>Om oss</NavLink>
                    </div>
                </div>

                {/* Knappar för att registrera, logga in och logga ut */}
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {!user ? <NavLink to="/register" className="button is-primary">Registrera</NavLink> : null}

                            {
                                user ? <button className="button is-light" onClick={logout}>Logga ut</button> : <NavLink to="/login" className="button is-light">Logga in</NavLink>
                            }

                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
