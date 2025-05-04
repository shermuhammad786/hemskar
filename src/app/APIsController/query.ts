import { getCookie } from "cookies-next";
import axios from "axios";
import { useCallback } from "react";

const token = getCookie("token") as string;
export const getAssignments = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ASSIGNMENT_URL}/api/student/assignment/submitted/assigment`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data.data;
}

// get top five students
export const getTopFiveStudents = async (quizId: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/student/quiz/top/five/student/quiz/${quizId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}
export const getAllQuizzes = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/student/quiz/get/all/quizzes`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data.data;
}

// login student
export const loginStudent = async (email: string, password: string) => {
    const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/student/auth/login`,
        {
            email: email,
            password: password,
        }, {
        withCredentials: true
    })
    return res.data;
}