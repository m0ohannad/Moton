import React, { useState } from 'react';
import '../style/Home.css';

function loginUser(user, setMessage, setToken) {

    return fetch('/user/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: "cors",
        body: JSON.stringify(user)
    })
        .then(data => data.json())
        .then(data => { data.message ? setMessage(data.message) : localStorage.setItem('token', data.token); setToken(data.token) })
        .catch(error => { setMessage(error.toString()) });
}

const Login = ({ toggleRegistration, setToken }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        loginUser({
            email,
            password
        }, setMessage, setToken);
    }

    return (
        <div className="login-box">
            <form className="login" onSubmit={handleSubmit}>
                <div className="login-wrapper">
                    <h1>تسجيل الدخول</h1>
                    <label>
                        <p>البريد الإلكتروني</p>
                        <input type="email" onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label>
                        <p>كلمة المرور</p>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                    {message && <p className="errmsg" >{message}</p>}
                    <div className="buttons" >
                        <p onClick={() => toggleRegistration("signUp")} >تسجيل</p>
                        <button type="submit">تسجيل الدخول</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;
