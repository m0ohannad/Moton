import React, { useState } from 'react';
import Info from '../components/Info';
import Edit from '../components/Edit';
import '../style/Home.css';
import '../style/Profile.css';

const Profile = ({ token, logout }) => {
    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState();

    return (
        <>
            {edit ? <Edit token={token} setEdit={setEdit} /> : <Info token={token} logout={logout} setEdit={setEdit} />}
        </>
    )
}

export default Profile;