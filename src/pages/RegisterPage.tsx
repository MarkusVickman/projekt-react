import React, { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Sida/komponent för att registrera nya användare
const RegisterPage = () => {

    //Variabler för formulär-indata
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    //Läser in registreringsfunktion samt användare(localstorage) 
    const { register, user } = useAuth();
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
                await register({ name, email, password });
                navigate("/login");
            } catch (error) {
                setError("Felaktig registrering:" + error)
            }
        }
    }

    //Metod som kontrollerar inmatningar och returnerar true om korrekt inmatat.
    const checkInput = () => {
        let validationErrors: boolean = true;
        let errorString = "";

        if (email.length < 6) {
            validationErrors = false;
            errorString = "Email måste vara längre än 6 tecken. ";
        }

        if (password.length < 6) {
            validationErrors = false;
            errorString = errorString + "Lösenord måste vara längre än 6 tecken. ";
        }

        if (name.length < 4) {
            validationErrors = false;
            errorString = errorString + "Visningsnamn måste vara längre än 4 tecken. ";
        }

        if (validationErrors) {
            setError("");
            return true
        } else {
            setError(errorString);
            return false
        }
    }

    /* Returnerar ett formulär för registrering */
    return (
        <>
            <div className="container">
                <h1 className="title ">Registrera nytt konto</h1>

                <form onSubmit={handleSubmit}>

                    <div className="field">
                        <label className="label" htmlFor="name">Visningsnamn</label>
                        <p className="control has-icons-left">
                            <input className="input" type="text" id="name" placeholder="Visningsnamn" required value={name} onChange={(e) => setName(e.target.value)} />
                            <span className="icon is-small is-left">
                                <i className="material-icons has-text-black"
                                    title="Visningsnamn">edit</i>
                            </span>
                        </p>
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="email">Email-adress</label>
                        <p className="control has-icons-left">

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
                                Registrera
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

export default RegisterPage