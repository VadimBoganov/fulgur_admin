import axios from "axios";
import React, {useState} from 'react';
import styles from "../Admin/Admin.module.scss";
import { useNavigate } from "react-router-dom";
import config from "../../config/config.json"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        try{
            const resp = await axios.post(`${config.protocol}${config.host}${config.port}/api/auth`, {email: email, password: password}, {withCredentials: true})
            const data = resp.data
            sessionStorage.setItem("access_token", data.access_token)
        }
        catch(err){
            setError(err.response.data)
            return ''
        }
            
        navigate('/admin/product')
    }

    return (
        <form className={styles.login} onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Авторизация</h1>
        <input type="email" className="form-control" placeholder="Введите почту" required
               onChange={e => setEmail(e.target.value)}
        />

        <input type="password" className="form-control" placeholder="Введите пароль" required
               onChange={e => setPassword(e.target.value)}
        />

        <button className="w-100 btn btn-lg btn-primary" type="submit">Войти</button>
        <span style={{color: "red", display: "flex", justifyContent:"center", marginTop:"5px"}}>{error}</span>
    </form>
    );
};

export default Login;