import Image from "next/image";
import axios from "axios";
import { getCookie } from "cookies-next";
import { memo, useEffect, useState } from "react";
import Loader from "../common/Loader";
import { getAllQuizzes, getTopFiveStudents } from "@/app/APIsController/query";


const ChatCard = () => {
  const [data, setData] = useState([])
  const [quizzesData, setQuizzesData] = useState([]) as any
  const [quizId, setQuizId] = useState('') as any
  const [loading, setLoading] = useState<boolean>(true);


  const getTopFiveStudentsHandler = async () => {
    setLoading(true)
    const students = await getTopFiveStudents(quizId)
    setLoading(false)
    setData(students)
  }
  const getAllQuizzesHandler = async () => {
    const quizzes: any = await getAllQuizzes()

    setQuizId(quizzes.reverse()[0]._id)
    setQuizzesData(quizzes)
  }

  useEffect(() => {
    getTopFiveStudentsHandler()

  }, [quizId])

  useEffect(() => {
    getAllQuizzesHandler()
  }, [])

  return (
    <div className="col-span-12 m-2 sm:m-5 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-4 sm:px-7.5 text-lg sm:text-xl font-semibold text-black dark:text-white">
        TOP FIVE STUDENTS
      </h4>

      <div className="mb-6 px-4 sm:px-7.5 text-lg sm:text-xl font-semibold">
        <label className="my-2.5 block font-medium text-black dark:text-white">
          Select Quiz
        </label>
        <select onChange={(e) => setQuizId(e.target.value)} className="removeDefaultArrow text-sm sm:text-xl w-full rounded-lg border border-stroke bg-transparent py-3 sm:py-4 pl-4 sm:pl-6 pr-8 sm:pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" name="gender" id="">
          {quizzesData.map((quiz: any, index: number) => (
            <option key={index} value={quiz._id}>{quiz.name.toUpperCase()} QUIZ {quiz.number}</option>
          ))
          }
        </select>
      </div>


      <div className="grid grid-cols-1 gap-4 sm:gap-6 px-3 sm:px-5">


        {loading ? <Loader /> : data.map((std: any, key) => (
          <div
            key={key}
            className="flex flex-col border border-gray-300 rounded-md p-3 sm:p-5 hover:shadow-md dark:border-strokedark dark:hover:bg-meta-4 transition-all"
          >
            {/* Top Row: Image, Name, Position, and Marks */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-4">
              {/* Student Profile Image */}
              <div className="relative h-20 w-20 rounded-full overflow-hidden">
                <Image
                  width={80}
                  height={80}
                  src={
                    std.studentId.gender === 'female'
                      ? '/images/user/girl-defalut-profile.jpg'
                      : std.studentId.profile
                        ? std.studentId.profile
                        : '/images/user/default-user-image.png'
                  }
                  alt="User"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Student Details */}

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-center justify-center w-full">
                {/* Name */}
                <div className="text-center">
                  {/* <h5 className="text-sm font-medium text-black dark:text-white">
                    Name
                  </h5> */}
                  <p className="text-sm sm:text-base font-bold text-gray-700 dark:text-gray-300">
                    {std.studentId.name}
                  </p>
                </div>

                {/* Position */}
                <div className="text-center flex justify-between border dark:border-white border-black items-center p-2 rounded-lg gap-2 sm:gap-4">

                  <h5 className="text-sm font-medium text-black dark:text-white">
                    Position
                  </h5>

                  <div className="flex items-center justify-center px-[8px] py-2 rounded-full bg-primary ">
                    <span className="text-sm font-medium text-white">
                      0{std.rank}
                    </span>
                  </div>
                </div>

                {/* Marks */}
                {std.textCount !== 0 && (
                  <div className="text-center flex justify-between border dark:border-white border-black items-center p-2 rounded-lg gap-2 sm:gap-4">
                    <h5 className="text-sm font-medium text-black dark:text-white">
                      Marks
                    </h5>
                    <div className="flex items-center justify-center px-[8px] py-2 rounded-full bg-primary ">
                      <span className="text-sm font-medium text-white">
                        {std.score}
                      </span>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default memo(ChatCard);
