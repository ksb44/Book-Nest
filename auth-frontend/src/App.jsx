
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import AddBook from './components/AddBook';
import Navbar from './components/Navbar';
import BookList from './components/Booklist';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<BookList/>} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/" element={<BookList />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
