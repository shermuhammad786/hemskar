'use client'
import { Suspense, useEffect, useState } from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Quizes from "@/components/Quiz";
import Loading from "../../loading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCookie } from "cookies-next";

// export const metadata: Metadata = {
//   title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };
const FormElementsPage = () => {
  const router = useRouter()
  const [quizCounts, setQuizCounts] = useState({
    html: 0,
    css: 0,
    javascript: 0
  }) as any;

  useEffect(() => {
    const fetchQuizCounts = async () => {
      try {
        const token = getCookie('token');
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/student/quiz/get/all/quizzes`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        // Count quizzes by name
        const counts = response.data.data.reduce((acc: any, quiz: any) => {
          const name = quiz.name.toLowerCase();
          acc[name] = (acc[name] || 0) + 1;
          return acc;
        }, {});

        setQuizCounts(counts);
      } catch (error) {
        console.error("Error fetching quiz counts:", error);
      }
    };

    fetchQuizCounts();
  }, []);

  const quizTypes = [
    {
      _id: 1,
      name: "HTML",
      description: "Basic to advanced quiz of HTML includes tags, structure and attributes",
    },
    {
      _id: 2,
      name: "CSS",
      description: "Basic to advanced quiz of CSS selectors, color, font, and background",
    },
    {
      _id: 3,
      name: "JAVASCRIPT",
      description: "Basic to advanced quiz of Javascript including variables, arrays, dataTypes, objects",
    },
  ];

  return (
    <DefaultLayout>
      <Suspense fallback={<Loading />} />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        {quizTypes.map((quiz, index) => (
          <div
            key={index}
            className="flex flex-col gap-9 cursor-pointer"
            onClick={() => router.replace(`/quiz/quiz/${quiz.name.toLowerCase()}`)}
          >
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white flex justify-between items-center">
                  <span>{quiz.name} Quiz</span>
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                    {quizCounts[quiz.name.toLowerCase()] || 0} Quizzes
                  </span>
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <p>{quiz.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default FormElementsPage;
