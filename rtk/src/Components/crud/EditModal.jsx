import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetStudentQuery, useUpdateStudentMutation } from '../../feature/Slice/StudentSlice';

function EditModal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError } = useGetStudentQuery(id);
  const [updateStudent] = useUpdateStudentMutation()

  const [student, setStudent] = useState({
    name: '',
    Email: '',
  });

  useEffect(() => {
    if (data) {
      setStudent({
        name: data.name || '',
        Email: data.Email || '',
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudent({ id, ...student }).unwrap();
      toast.success('Student updated successfully!');
      navigate('/');
    } catch (error) {
        console.log(error)
      toast.error('Failed to update student.');
    }
  };

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (isError) return <div className="text-center mt-5">Error loading data.</div>;

  return (
    <div className="h-screen py-5">
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto shadow-lg p-3">
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your Name
          </label>
          <input
            name="name"
            value={student.name}
            onChange={handleChange}
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            name="Email"
            value={student.Email}
            onChange={handleChange}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
       

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditModal;
