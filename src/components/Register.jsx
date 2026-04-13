import { Link } from "react-router-dom";
import { useState } from "react";
import "../blocks/register.css";
import useAppState from "../hooks/useAppState.js";

const Register = () => {
    const { actions } = useAppState();
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
        actions.handleRegistration(data);
    };

    return (
        <div className="register">
            <p className="register__welcome">Inscreva-se</p>
            <form className="register__form" onSubmit={handleSubmit}>
                <input
                    className="register__input"
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                />
                <input
                    className="register__input"
                    id="password"
                    name="password"
                    placeholder="Senha"
                    type="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="register__button">
                    Inscreva-se
                </button>
            </form>
            <div className="register__signin">
                <Link to="/signin" className="register__login-link">
                    Já é um membro? Faça o login aqui!
                </Link>
            </div>
        </div>
    );
};

export default Register;
