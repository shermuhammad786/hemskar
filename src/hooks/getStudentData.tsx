import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from "cookies-next";
import axios from "axios";
import { getStudentData } from "@/redux/slice";



const useGetData = () => {
    const [studentData, setStudentData] = useState();
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            const token = getCookie("token") as string;
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/student/dashboard/student/info`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            // console.log('res: use get student data ===>>>  ', res);
            if (res.data) {
                setStudentData(res.data)
                dispatch(getStudentData(res.data))
            }
        }
        fetchData()
    }, [dispatch])

    return [studentData, setStudentData];
};

export default useGetData;