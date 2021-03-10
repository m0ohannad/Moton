import React from 'react';

const Home = ({ toggleRegistration }) => {

    return (
        <div className="container">
            <div className="home">
                <div className="center">
                    <h1 className="title" >متون</h1>
                    <p className="describe" >لقراءة متون برنامج معونة المتعلم والاستماع لها مع الشرح</p>
                    <button onClick={() => toggleRegistration("login")} >تسجيل الدخول</button>
                    <button className="black" onClick={() => toggleRegistration("signUp")} >تسجيل</button>
                </div>
            </div>
        </div>
    );
}

export default Home;