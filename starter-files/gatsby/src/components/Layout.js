import React from 'react';
import Footer from './Footer';
import Nav from './Nav';
import 'normalize.css';

export default function Layout(props) {
  const { children } = props;
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
