import React from "react";
import { NavLink } from 'react-router-dom';
import '../style/Header.css'

const Header = ({ logout }) => {
    return (
        <ul className="navbar">
            <li className="navbar-item">
                <NavLink exact to="/" activeStyle={{ color: '#ABF292' }} >المتون</NavLink>
            </li>
            <li className="navbar-item">
                <NavLink exact to="/explain" activeStyle={{ color: '#ABF292' }} >الشرح</NavLink>
            </li>
            <li className="navbar-item">
                <NavLink exact to="/schedule" activeStyle={{ color: '#ABF292' }} >جدول الحفظ</NavLink>
            </li>
            <li className="navbar-item">
                <NavLink exact to="/profile" activeStyle={{ color: '#ABF292' }} >الملف الشخصي</NavLink>
            </li>
        </ul>
    );
}

export default Header;