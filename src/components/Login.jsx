import { Link } from "react-router-dom";
import { useState } from "react";
import "../blocks/login.css";

const Login = ({ handleLogin }) => {
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
                <input
                    className="login__input"
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                />
                <input
                    className="login__input"
                    id="password"
                    name="password"
                    placeholder="Senha"
                    type="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="login__button">
                    Entrar
                </button>
            </form>

            <div className="login__signup">
                <Link to="/signup" className="signup__link">
                    Ainda não é membro? Inscreva-se aqui!
                </Link>
            </div>
        </div>
    );
};

export default Login;
