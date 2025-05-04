'use client'
import { Suspense, useState } from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Quizes from "@/components/Quiz";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

// export const metadata: Metadata = {
//   title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };
const QuizDetails = () => {
    const router = useRouter()

    const quizes = [
        {
            _id: 1,
            name: "HTML Quiz 1",
            description: "Basic quiz of HTML includes tags , structure and  attributes",
            duration: "20 Seconds Per Question"
        },
        {
            _id: 2,
            name: "HTML Quiz 2",
            description: "Advance quiz of HTML table , form and  images",
            duration: "20 Seconds Per Question"
        },
        {
            _id: 3,
            name: "HTML Quiz 3",
            description: "All HTML Inculded in this Quiz",
            duration: "20 Seconds Per Question"
        },
    ]
    return (
        <DefaultLayout>
            <Suspense fallback={<Loading />} />
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">

                {quizes && quizes.map((quiz: any, index: number) => (
                    <div key={index} className="flex flex-col gap-9 cursor-pointer" onClick={() => router.push(`/quiz/practice/${quiz.name.toLowerCase().split(" ")[0]}/${quiz._id}`)}  >
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    {quiz.name}
                                </h3>
                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div>
                                    <p>{quiz.description}</p>
                                </div>
                                <div>
                                    <h1>{quiz.duration}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }

            </div>

        </DefaultLayout>
    );
};

export default QuizDetails;
