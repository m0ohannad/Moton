import React, { useState } from 'react';
import '../style/Home.css';
import '../style/Profile.css';

function deleteUser(ID, setMessage) {
    fetch(`/user/${ID}`, { method: 'DELETE' })
        .then(() => alert('Delete successful'))
        .catch(error => { setMessage(error) });
}

const Info = ({ token, logout, setEdit }) => {
    const [ID, setID] = useState();
    const [name, seName] = useState();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();


    const handleSubmit = async e => {
        e.preventDefault();
        if (window.confirm('سيتم حذف الحساب بشكل نهائي\n هل أنت متأكد من حذف الحساب؟')) {
            deleteUser(ID, setMessage);
            logout()
        }
    }

    fetch('/user/profile', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            token: token
        },
    })
        .then(data => data.json())
        .then(data => {
            data.message ? setMessage(data.message) :
                seName(data.user.name)
            setEmail(data.user.email)
            setID(data.user._id)
        })
        .catch(error => { setMessage(error) });

    return (
        <div className="login-box">
            <form className="login" onSubmit={handleSubmit}>
                <div className="login-wrapper">
                    <h1>معلومات الحساب</h1>
                    <h2>الاسم</h2>
                    <h3 className="info">{name}</h3>

                    <h2>البريد الإلكتروني</h2>
                    <h3 className="info">{email}</h3>
                    {message && <p className="errmsg" >{message}</p>}
                    <div className="buttons" >
                        <button type="submit" className="red">حذف الحساب</button>
                        <button className="black" onClick={() => logout()} >تسجيل الخروج</button>
                        <button onClick={() => setEdit(true)}>تعديل البيانات</button>
                    </div>
                </div>
            </form>
        </div >
    )
}

export default Info;