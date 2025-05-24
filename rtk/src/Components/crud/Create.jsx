import React, { useState } from 'react'
import { useAddStudentsMutation } from '../../feature/Slice/StudentSlice';
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';

function Create() {
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        name: "",
        email: '',
        password: '',
    });


    // const {refetch} =  useGetStudentsQuery();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    // this is api call function name
    const [addStudents] = useAddStudentsMutation();


    const handleSubmit = async (e) => {
       try {
         e.preventDefault();
        await addStudents(student);
        // refetch()
        navigate('/')
        toast.success("Added user successfully")
        console.log('Form Data:', student);
       } catch (error) {
        console.log(error)
        toast.error("something went wrong")
       }
    };

    return (
        <div className='h-screen py-5'>


            <form className="max-w-sm mx-auto shadow-lg p-3" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                    <input onChange={handleChange} name='name' value={student.name} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input onChange={handleChange} name='email' value={student.email} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input onChange={handleChange} name='password' value={student.password} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </div>
    )
}

export default Create
