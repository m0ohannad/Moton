import React, { useState } from 'react';
import '../style/Home.css';
import '../style/Profile.css';

function editUser(update, token, setMessage) {
    fetch(`/user`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            token: token
        },
        mode: "cors",
        body: JSON.stringify(update)
    })
        .then(data => data.json())
        .then(data => { data.message ? setMessage(data.message) : setMessage('تم التعديل بنجاح') })
        .catch(error => { console.log(error) });
}

const Edit = ({ token, setEdit }) => {
    const [name, seName] = useState();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        if (!name || !email) {
            setMessage('يجب ملء الحقول')
        } else {
            editUser({
                name,
                email,
            }, token, setMessage);
        }
    }

    return (
        <div className="login-box">
            <form className="login" onSubmit={handleSubmit}>
                <div className="login-wrapper">
                    <h1>تعديل معلومات الحساب</h1>
                    <label>
                        <p>الاسم</p>
                        <input type="name" onChange={e => seName(e.target.value)} />
                    </label>
                    <label>
                        <p>البريد الإلكتروني</p>
                        <input type="email" onChange={e => setEmail(e.target.value)} />
                    </label>
                    {message && <p className="errmsg" >{message}</p>}
                    <div className="buttons" >
                        <button onClick={() => setEdit(false)} className="black">رجوع</button>
                        <button type="submit">تعديل البيانات</button>
                    </div>
                </div>
            </form>
        </div >
    )
}

export default Edit;