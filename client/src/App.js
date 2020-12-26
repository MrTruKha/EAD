import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from "react-router-dom";
import Book from './pages/book';

function App() {
  return (
    <Router>
      <Redirect exact from="/" to="/products" />
      <Route path="/products" component={ Book } />
    </Router>
  );
}

export default App;
