import React from 'react'
import { useDeleteStudentsMutation, useGetStudentsQuery } from '../../feature/Slice/StudentSlice'
import { toast } from 'react-toastify';
import { Link} from 'react-router-dom';

function FetchData() {
   
    const { data: students, isSuccess, isError, isLoading } = useGetStudentsQuery();
    // console.log(students)

    const [deleteStudents] = useDeleteStudentsMutation();
    const deleteStudentData = (item)=>{
        deleteStudents(item?.id)
        toast.success("deleted sucess")
    }
    return (
        <div className='container mx-auto'>
            {isLoading && <span>Loading...</span>}
            {isError && <span>something went wrong...</span>}
            {isSuccess && <div className='grid grid-cols-1 lg:grid-cols-4 gap-3'>
                {students?.map((item) => (
                    <div key={item.id} className="shadow-lg w-full h-96 p-3 flex flex-col items-center justify-center">
                        <h1>{item.Email}</h1>
                          <h1>{item.name}</h1>
                          <div className='flex gap-3 items-center'>
                            <button className='bg-red-400 p-2 rounded' onClick={()=> deleteStudentData(item) }>Delete</button>
                            <button className='bg-blue-400 p-2 rounded'><Link to={`edit/${item.id}`}>Edit</Link></button>
                            </div>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default FetchData
