import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const StudentApi = createApi({

    baseQuery: fetchBaseQuery({ baseUrl: 'https://68315d616205ab0d6c3c0b78.mockapi.io' }),
    tagTypes: ["student"],
    endpoints: (builder) => ({
        getStudents: builder.query({
            query: () => "/Email",
            providesTags: ["student"],
        }),
        getStudent: builder.query({
            query: (id) => `/Email/${id}`,
            providesTags: (result, error, id) => [{ type: "student", id }],
        }),
        updateStudent: builder.mutation({
            query: ({ id, ...student }) => ({
                url: `/Email/${id}`,
                method: 'PUT',
                body: student,
            }),
            invalidatesTags: ['student'],
        }),

        addStudents: builder.mutation({
            query: (student) => ({
                url: "/Email",
                method: "POST",
                body: student
            }),
            invalidatesTags: ["student"]
        }),
        deleteStudents: builder.mutation({
            query: (id) => ({
                url: `/Email/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["student"]
        }),
    })
})
export const { useGetStudentsQuery,
    useAddStudentsMutation,
    useDeleteStudentsMutation,
    useGetStudentQuery,
    useUpdateStudentMutation
} = StudentApi;