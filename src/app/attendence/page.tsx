'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import { markAttendence } from "@/reactQuery/reactquery";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFan } from "@fortawesome/free-solid-svg-icons";


const Attendence = () => {
    const [loading, setLoading] = useState(false)
    const data = useSelector((state: RootState) => state.data.value)
    const markAttendenceHandler = async () => {
        setLoading(true)
        const res = await markAttendence()
        setLoading(false)
        if (res.data) {
            alert(res.data.message)
        }
    }
    return (
        <DefaultLayout>
            <Breadcrumb pageName="FRONT-END COURSE" />
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9 justify-top items-top" >
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h1 className="font-medium text-black dark:text-white">
                                Welcome, {data?.name}! Please mark your attendance for today's session.
                            </h1>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                            </div>
                            <div>
                                {<button className="py-6 px-16 rounded-sm  bg-green-600 text-white font-bold text-lg" onClick={markAttendenceHandler}>Mark Attendance {loading && <FontAwesomeIcon className="loadingButton" icon={faFan} />} </button>}
                                {/* <p className="cursor-text mt-10">Remaning Time <span>00:00</span></p> */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Attendence;
