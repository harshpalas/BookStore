import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book deleted successfully ✅', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error while deleting ❌', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <BackButton />
        <h1 className="text-3xl font-semibold text-gray-800 my-6 text-center">
          Delete Book
        </h1>

        {loading && <Spinner />}

        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-xl font-medium text-gray-700">
            Are you sure you want to delete this book?
          </h3>

          <div className="mt-8 flex gap-4 justify-center">
            <button
              onClick={handleDeleteBook}
              className="px-6 py-3 w-40 rounded-xl bg-red-600 text-white font-medium shadow-md hover:bg-red-700 hover:shadow-lg transition"
            >
              Yes, Delete
            </button>

            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 w-40 rounded-xl bg-gray-200 text-gray-700 font-medium shadow-md hover:bg-gray-300 hover:shadow-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
