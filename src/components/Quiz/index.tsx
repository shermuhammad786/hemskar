"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import QuizApp from "./quiz/quiz";
import { createContext, useEffect, useState } from "react";
import { Button, Modal, Progress, Space } from "antd";
import { useParams } from "next/navigation";
import { getCookie } from "cookies-next";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { getQuizData } from "@/redux/quizSlice";
import Loader from "../common/Loader";


const Quizes = () => {
  const [modal, contextHolder] = Modal.useModal();
  const [code, setCode] = useState('')
  const [start, setStart] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [getQuiz, setGetQuiz] = useState(false)
  const [quizData, setQuizData] = useState() as any
  const [SubmitQuizData, setsubmitQuizData] = useState() as any
  const [quizDuration, setQuizDuration] = useState() as any


  // const [dataQuiz, setDataQuiz] = useState([]) as any
  const ReachableContext = createContext<string | null>(null);
  const UnreachableContext = createContext<string | null>(null);

  const dataQuiz = useSelector((state: RootState) => state.quiz.quiz)

  const config = {
    title: 'Please read the blow instructions',
    content: (
      <>
        <h2 className="text-lg font-semibold mb-2">Quiz Details</h2>
        <ul className="list-disc ml-6">
          <li>You have <strong>{quizDuration} seconds</strong> to answer each question.</li>
          <li>Please don't refresh the page. or switch to other tab. <b>otherwise your quiz will be submitted automatically</b></li>
          <li>The quiz contains <strong>20 questions</strong>.</li>
          <li>Once you submit a question, you cannot go back to it.</li>
          <li>Each correct answer awards <strong>1 points</strong>.</li>
          <li>Attempt all questions to maximize your score!</li>
        </ul>
        <br />
        <h2 className="text-lg font-semibold mb-2 text-center">Best Of Luck! 😊</h2>
      </>
    ),
    onOk() {
      setStart(true)
    },
  };
  const wrongConfig = {
    title: '❌ Invalid quiz code. Please try again.',
  };
  const startQuiz = async () => {
    const quizCode = "code"

    if (dataQuiz.status) {
      if (code === dataQuiz.data.code) {

        modal.info(config);

      } else {
        setStart(false)
        modal.info(wrongConfig);
      }
    } else {
      setStart(false)
      modal.info(wrongConfig);
    }
  }


  const params = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    const quizessss = async () => {
      const token = await getCookie("token") as string;

      
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/student/quiz/${params.quiz}/${params.quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setQuizDuration(res?.data?.data?.duration);
      setsubmitQuizData(res?.data?.data);
      

      const alreadySubmitted = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/student/quiz/${res?.data?.data?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Check for saved progress
      const savedProgress = localStorage.getItem('quizProgress');

      if (alreadySubmitted.data.status && !savedProgress) {
        // Only show result if quiz was actually submitted and there's no saved progress
        setGetQuiz(true);
        setShowResult(true);
        setQuizData(alreadySubmitted.data.data);
      } else {
        // Either quiz wasn't submitted or there's saved progress
        setGetQuiz(true);
        setShowResult(false);
        if (savedProgress) {
          setStart(true); // Automatically start the quiz if there's saved progress
        }
      }

      dispatch(getQuizData(res.data));
    };
    quizessss();
  }, []);
  const getStatus = (percentage: any) => {
    if (percentage >= 70 && percentage <= 100) {
      return "active";
    } else if (percentage > 32 && percentage < 70) {
      return "normal";
    } else if (percentage < 33) {
      return "exception";
    }
  };

  return (
    <>
      <Breadcrumb pageName={!getQuiz ? "" : `${SubmitQuizData?.name.toUpperCase()}  ${SubmitQuizData?.number} QUIZ`} />
      <div className="flex flex-col gap-8 justify-center items-center mt-4">
        {!getQuiz ? <Loader /> : showResult ? <div>
          <h2>Quiz Result</h2>
          <p className="mb-4">
            You scored {quizData?.score} out of {quizData?.total}
          </p>
          <Progress
            percent={(quizData?.score / quizData?.total) * 100}
            status={getStatus((quizData?.score / quizData?.total) * 100)}
            format={(percent) => `${percent} %`}
            type="circle"
            size={130}

          />
        </div> : <>
          {<div className={`flex justify-center items-center gap-4 ${start && "hidden"}`}>
            <input placeholder="Please put the quiz code" onChange={(e) => setCode(e.target.value)} type="text" className="w-[300px] h-[50px] border text-black text-lg font-bold border-black-2 rounded-md p-2" />

            <ReachableContext.Provider value="Light">
              <Space>
                <Button
                  className="w-[150px] h-[50px] border border-black-2 rounded-md text-black text-lg font-bold"
                  onClick={startQuiz}
                >
                  Start Quiz
                </Button>
              </Space>
              {contextHolder}

              <UnreachableContext.Provider value="Bamboo" />
            </ReachableContext.Provider>

          </div>
          }
          {
            start &&
            <QuizApp quizData={dataQuiz} />
          }
        </>}
      </div >
    </>
  );
};

export default Quizes;
