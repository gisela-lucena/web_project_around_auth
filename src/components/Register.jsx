import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "./Header/Header";
import "../blocks/register.css";

const Signup = ({ handleRegistration }) => {
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
        handleRegistration(data);
    };

    return (
        <div className="register">
            <Header title={"Around the US"} />
            <p className="register__welcome">Inscreva-se</p>
            <form className="register__form" onSubmit={handleSubmit}>
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
                <div className="register__button-container">
                    <button type="submit" className="register__link">
                        Inscreva-se aqui
                    </button>
                </div>
            </form>
            <div className="register__signin">
                <p>Já é um membro?</p>
                <Link to="login" className="register__login-link">
                    Faça o login aqui!
                </Link>
            </div>
        </div>
    );
};

export default Signup;
