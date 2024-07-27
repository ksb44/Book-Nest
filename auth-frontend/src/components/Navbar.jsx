import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">Book Store</Link>
        </div>
        <div>
          <Link to="/signup" className="mr-4">Signup</Link>
          <Link to="/login" className="mr-4">Login</Link>
          <Link to="/books" className="mr-4">Books</Link>
          <Link to="/add-book">Add Book</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
