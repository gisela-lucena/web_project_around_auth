import { Link } from "react-router-dom";
import { useState } from "react";
import "../blocks/login.css";
import Header from "./Header/Header";

const Signin = ({ handleLogin }) => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(data);
    };

    return (
        <div className="login">
            <Header />
            <p className="login__welcome">
                Entrar
            </p>
            <form className="login__form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    placeholder="Email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Senha:</label>
                <input
                    id="password"
                    placeholder="Senha"
                    type="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                />
                <div className="login__button-container">
                    <button type="submit" className="login__link">
                        Login
                    </button>
                </div>
            </form>

            <div className="login__signup">
                <p>Ainda não é membro?</p>
                <Link to="/signup" className="signup__link">
                    Inscreva-se aqui
                </Link>
            </div>
        </div>
    );
};

export default Signin;