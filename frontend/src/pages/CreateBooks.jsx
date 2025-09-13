import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { MdOutlineLibraryAdd } from 'react-icons/md';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('✅ Book Created Successfully!', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('❌ Something went wrong', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="relative min-h-screen p-8 bg-gradient-to-br from-sky-100 via-blue-50 to-purple-100">
      <div className="mb-6">
        <BackButton />
      </div>

      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 text-transparent bg-clip-text drop-shadow-sm text-center mb-10">
        ✨ Create a New Book
      </h1>

      {loading && (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      )}

      <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-lg border border-gray-200 p-8 rounded-3xl shadow-xl">
        {/* Title */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            📖 Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none shadow-sm"
            placeholder="Enter book title"
          />
        </div>

        {/* Author */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            ✍️ Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none shadow-sm"
            placeholder="Enter author name"
          />
        </div>

        {/* Publish Year */}
        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            📅 Publish Year
          </label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none shadow-sm"
            placeholder="e.g. 2025"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveBook}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-lg font-semibold rounded-2xl shadow-lg hover:scale-105 transition-transform"
        >
          <MdOutlineLibraryAdd className="text-2xl" />
          Save Book
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
