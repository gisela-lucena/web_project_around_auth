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
            <p className="register__welcome">Inscreva-se</p>
            <form className="register__form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input className="register__email"
                    id="email"
                    placeholder="Email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Senha:</label>
                <input className="register__password"
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
                <Link to="/signin" className="register__login-link">
                    Já é um membro? Faça o login aqui!
                </Link>
            </div>
        </div>
    );
};

export default Signup;
