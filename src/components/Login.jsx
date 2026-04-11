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
            <p className="login__welcome">
                Entrar
            </p>
            <form className="login__form" onSubmit={handleSubmit}>
                <label htmlFor="email"></label>
                <input
                    className="login__email"
                    id="email"
                    placeholder="Email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password"></label>
                <input
                    className="login__password"
                    id="password"
                    placeholder="Senha"
                    type="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                />
                <div className="login__button-container">
                    <button type="submit" className="login__link">
                        Entrar
                    </button>
                </div>
            </form>

            <div className="login__signup">
                <Link to="/signup" className="signup__link">
                    Ainda não é membro? Inscreva-se aqui!
                </Link>
            </div>
        </div>
    );
};

export default Signin;