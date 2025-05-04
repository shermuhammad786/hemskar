'use client'
import { Suspense, useState, useEffect } from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Quizes from "@/components/Quiz";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { useParams } from "next/navigation";
import { getCookie } from "cookies-next";
import axios from "axios";

// export const metadata: Metadata = {
//   title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };
const QuizDetails = () => {
    const router = useRouter()
    const params: any = useParams()
    const [quizzes, setQuizzes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAllQuizzes = async () => {
            try {
                const token = getCookie('token')
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/student/quiz/get/all/quizzes`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )

                // Filter quizzes by the current category (params.quiz)
                const filteredQuizzes = response.data.data.filter((quiz: any) =>
                    quiz.name.toLowerCase() === params.quiz.toLowerCase()
                )

                setQuizzes(filteredQuizzes.reverse())
                setLoading(false)
            } catch (error) {
                console.error("Error fetching quizzes:", error)
                setLoading(false)
            }
        }

        getAllQuizzes()
    }, [params.quiz])

    return (
        <DefaultLayout>
            <Suspense fallback={<Loading />} />
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                {loading ? (
                    <Loading />
                ) : (
                    quizzes.map((quiz: any, index: number) => (
                        <div
                            key={index}
                            className="flex flex-col gap-9 cursor-pointer"
                            onClick={() => router.replace(`/quiz/quiz/${quiz.name.toLowerCase()}/${quiz._id}`)}
                        >
                            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white">
                                        {quiz.name.toUpperCase()} Quiz {quiz.number}
                                    </h3>
                                </div>
                                <div className="flex flex-col gap-5.5 p-6.5">
                                    <div>
                                        <p>{quiz.description}</p>
                                    </div>
                                    <div>
                                        <h1>{quiz.duration} Seconds Per Question</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </DefaultLayout>
    )
}

export default QuizDetails;
