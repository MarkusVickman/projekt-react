import React, { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Sida/komponent för att logga in användare
const LoginPage = () => {

    //Variabler för formulär-indata
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    //Läser in inloggningsfunktionen samt användare(localstorage) 
    const { login, user } = useAuth();
    const navigate = useNavigate();

    //Vid start av sidan kontrolleras om användaren redan är inloggad.
    useEffect(() => {
        if (user) {
            navigate("/personal")
        }
    }, [user])

    //Vid submit skickas data till metod i AuthContext
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (checkInput()) {
            try {
                await login({ email, password });
                navigate("/personal");
            } catch (error) {
                setError("Felaktig inloggning. Säkerställ att lösenord och email är korrekt.")
            }
        }
    }

    //Metod som kontrollerar inmatningar och returnerar true om korrekt inmatat.
    const checkInput = () => {
        let validationErrors: boolean = true;
        if (email.length < 6 || password.length < 6) {
            validationErrors = false;
            setError("Lösenord och email måste vara längre än 6 tecken.");
        }

        if (validationErrors) {
            setError("");
            return true
        } else {
            return false
        }
    }

    /* Returnerar ett formulär för inloggning */
    return (
        <>
            <div className="container">
                <h1 className="title ">Logga in på ditt konto</h1>

                <form onSubmit={handleSubmit}>

                    <div className="field">
                        <label className="label" htmlFor="email">Email-adress</label>
                        <p className="control has-icons-left has-icons-right">

                            <input className="input" type="email" id="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <span className="icon is-small is-left">
                                <i className="material-icons has-text-black"
                                    title="Email">email</i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="password">Lösenord</label>
                        <p className="control has-icons-left">

                            <input className="input" type="password" placeholder="Password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <span className="icon is-small is-left">
                                <i className="material-icons has-text-black"
                                    title="Lösenord">password</i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <button className="button is-success" type="submit">
                                Logga in
                            </button>
                        </p>
                        {error && (
                            <div>
                                {error}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginPage