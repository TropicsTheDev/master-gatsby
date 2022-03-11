import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const NavStyles = styled.nav`
  margin-bottom: 3rem;
  ul {
    margin: 0;
    padding: 0;
    text-align: center;
    list-style: none;

    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    grid-gap: 2rem;
    align-items: center;
  }

  li {
    --rotate: (-2deg)
    transform: rotate(var(--rotate));

    &:nth-child(2) {
      --rotate: -2.5deg;
    }

    &:nth-child(4) {
      --rotate: 2.5deg;
    }

    &:hover {
      --rotate: 3deg;
    }
  }

 a{
   font-size: 3rem;
   text-decoration: none;
   &:hover {
     color: var(--red)
   }
 }
`;

export default function Nav() {
  return (
    <NavStyles>
      <ul>
        <li>
          <Link to="/">Hot Now</Link>
        </li>
        <li>
          <Link to="/pizzas">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/">LOGO</Link>
        </li>
        <li>
          <Link to="/slicemasters">Slicemasters</Link>
        </li>
        <li>
          <Link to="/order">Order Ahead</Link>
        </li>
      </ul>
    </NavStyles>
  );
}
