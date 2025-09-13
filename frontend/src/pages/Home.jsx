import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import { BsTable, BsGrid3X3Gap } from 'react-icons/bs';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative p-8 min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-purple-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 text-transparent bg-clip-text drop-shadow-sm">
          📚 My Bookshelf
        </h1>

        {/* Toggle View */}
        <div className="flex bg-white/70 backdrop-blur-md border border-sky-100 rounded-full shadow-lg overflow-hidden">
          <button
            className={`px-5 py-2 flex items-center gap-2 text-sm font-medium transition-all ${
              showType === 'table'
                ? 'bg-sky-500 text-white'
                : 'text-gray-600 hover:bg-sky-100'
            }`}
            onClick={() => setShowType('table')}
          >
            <BsTable className="text-lg" />
            Table
          </button>
          <button
            className={`px-5 py-2 flex items-center gap-2 text-sm font-medium transition-all ${
              showType === 'card'
                ? 'bg-sky-500 text-white'
                : 'text-gray-600 hover:bg-sky-100'
            }`}
            onClick={() => setShowType('card')}
          >
            <BsGrid3X3Gap className="text-lg" />
            Cards
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-xl p-8 min-h-[70vh]">
        {loading ? (
          <div className="flex justify-center py-24">
            <Spinner />
          </div>
        ) : showType === 'table' ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>

      {/* Floating Add Button */}
      <Link
        to="/books/create"
        className="fixed bottom-8 right-8 bg-gradient-to-r from-sky-500 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        <MdOutlineAddBox className="text-3xl" />
      </Link>
    </div>
  );
};

export default Home;
