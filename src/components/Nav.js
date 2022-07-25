import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = props => (
    <nav className="main-nav">
        <ul>
          <li><NavLink to='/castles'>Castles</NavLink></li>
          <li><NavLink to='/radiohead'>Radiohead</NavLink></li>
          <li><NavLink to='/chicago'>Chicago</NavLink></li>
        </ul>
    </nav>
);

export default Nav;