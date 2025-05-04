import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next";

export const useGetStudentData = () => {
    const token = getCookie("token") as string;
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () => {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/student/dashboard/student/info`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            return response
        },
    }) as any
    return { isLoading, error, data, isFetching }
}

export const markAttendence = async () => {
    const token = await getCookie("token") as string;
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/student/attendence`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
};

export const CheckAttendenceTime = async () => {
    const token = getCookie("token") as string;

    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/student/attendence/timer/get`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    )
    return response

};