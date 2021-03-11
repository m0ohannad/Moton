import React, { useState } from 'react';
import '../style/Home.css';

function signUpUser(user, setMessage, setToken) {
    return fetch('/user/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: "cors",
        body: JSON.stringify(user)
    })
        .then(data => data.json())
        .then(data => { data.message ? setMessage(data.message) : localStorage.setItem('token', data.token); setToken(data.token); })
        .catch(error => { setMessage(error.toString()) });
}

const SignUp = ({ toggleRegistration, setToken }) => {
    const [name, seName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirm, setConfirm] = useState();
    const [message, setMessage] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        if (password === confirm) {
            signUpUser({
                name,
                email,
                password
            }, setMessage, setToken);
        } else { setMessage("كلمة السر غير متطابقة") }
    }

    return (
        <div className="login-box">
            <form className="login" onSubmit={handleSubmit}>
                <div className="login-wrapper">
                    <div className="buttons" >
                        <p className="back" onClick={() => toggleRegistration("Home")} >x</p>
                    </div>
                    <h1>تسجيل</h1>
                    <label>
                        <p>الاسم</p>
                        <input type="name" onChange={e => seName(e.target.value)} />
                    </label>
                    <label>
                        <p>البريد الإلكتروني</p>
                        <input type="email" onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label>
                        <p>كلمة المرور</p>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                    </label>
                    <label>
                        <p>تأكيد كلمة المرور</p>
                        <input type="password" onChange={e => setConfirm(e.target.value)} />
                    </label>
                    {message && <p className="errmsg" >{message}</p>}
                    <div className="buttons" >
                        <p onClick={() => toggleRegistration("login")} >تسجيل الدخول</p>
                        <button type="submit">تسجيل</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUp;