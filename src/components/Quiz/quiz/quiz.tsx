// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Button, Progress, Typography, Input, Modal } from "antd";
import questionsJson from "./dummyQuiz.json";
import "./Quiz.css";
import { FieldTimeOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useSelector } from "react-redux";

const { Title } = Typography;

const QuizApp = ({ quizData }) => {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showalert, setshowalert] = useState(undefined);
  const [seconds, setSeconds] = useState(60);
  const [secondsQuiz, setSecondsQuiz] = useState(0);
  const [pass, setPass] = useState(null);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [value, setValue] = useState(0);
  const [currentPer, setCurrentPer] = useState(0);
  const [maxPer, setMaxPer] = useState(100);
  const [minPer, setMinPer] = useState(0);
  // const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFeedBackModel, setShowFeedBackModel] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [SubmittedQuiz, setSubmittedQuiz] = useState();
  const [modal, contextHolder] = Modal.useModal();
  const [clicked, setClicked] = useState(false);


  const router = useRouter()
  // const quizData = useSelector((state: RootState) => state.quiz.quiz)

  // 
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds <= 0) {
        clearInterval(interval);
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSeconds(secondsQuiz); // Reset timer for next question
          setSelectedOption(null);
          setValue(value + 1);
        } else {
          // If it's the last question, show results
          setShowResult(true);
          setQuizCompleted(true);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, currentQuestionIndex, questions.length]);

  const params = useParams()

  // useEffect(() => {
  //   const quizessss = async () => {
  // 
  //     const token = await getCookie("token") as string;
  // 
  //     const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/student/quiz/${params.quiz}/0${params.quizId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  // 
  //   }
  //   quizessss()
  // }, [])

  useEffect(() => {
    const questions = quizData?.data.quiz.map((eachQuestion) => {
      setSecondsQuiz(quizData?.data.duration)
      
      // Create array with incorrect answers and correct answer
      const allAnswers = [
        ...eachQuestion.incorrect_answers,
        eachQuestion.correct_answer,
      ];

      // Shuffle the answers array
      const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

      return {
        ...eachQuestion,
        // Encode the question when storing
        question: encodeURIComponent(eachQuestion.question),
        incorrect_answers: shuffledAnswers,
      };
    });

    setQuestions(questions);
    setTotalQuestions([...questions]);
  }, []);

  // Load saved progress on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('quizProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCurrentQuestionIndex(progress.currentQuestionIndex);
      setCorrectAnswers(progress.correctAnswers);
      setWrongAnswer(progress.wrongAnswer);
      setValue(progress.value);
      setSeconds(secondsQuiz); // Reset timer for the current question
    }
  }, []);

  // Save progress whenever relevant state changes
  useEffect(() => {
    if (!quizCompleted && currentQuestionIndex > 0) {
      const progressToSave = {
        currentQuestionIndex,
        correctAnswers,
        wrongAnswer,
        value
      };
      localStorage.setItem('quizProgress', JSON.stringify(progressToSave));
    }
  }, [currentQuestionIndex, correctAnswers, wrongAnswer, value, quizCompleted]);

  // Clear saved progress when quiz is completed
  useEffect(() => {
    if (quizCompleted) {
      localStorage.removeItem('quizProgress');
    }
  }, [quizCompleted]);

  const data = [
    {
      val: 100,
      color: "green",
    },
    {
      val: currentPer,
      color: "yellow",
    },
    {
      val: maxPer,
      color: "orange",
    },
    {
      val: minPer,
      color: "red",
    },
  ];

  const handleNextQuestion = () => {
    // Reset states for next question
    setClicked(false);
    setSelectedOption(null);
    setshowalert(undefined);
    setPass(null);
    setSeconds(60);
    setValue(value + 1);

    if (currentQuestionIndex === questions.length - 1) {
      setShowResult(true);
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    // Update percentages
    setMinPer((correctAnswers * 100) / questions.length);
    setCurrentPer((correctAnswers * 100) / (currentQuestionIndex + 1));
    setMaxPer(
      ((correctAnswers + (questions.length - (currentQuestionIndex + 1))) * 100) /
      questions.length
    );
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setClicked(true); // Set clicked to true when an option is selected

    // Store the selected answer with the question
    const updatedQuestions = [...totalQuestions];
    updatedQuestions[currentQuestionIndex].selectedAnswer = option;
    setTotalQuestions(updatedQuestions);

    if (option === questions[currentQuestionIndex].correct_answer) {
      setPass(true);
      setshowalert(true);
    } else {
      setPass(false);
      setshowalert(false);
    }
  };


  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);

  };

  const handleFeedbackSubmit = async () => {
    setIsFeedbackModalVisible(false);
    

    const token = await getCookie("token") as string;

    const submit = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/student/quiz/submit/quiz/feedback/${SubmittedQuiz._id}`, { feedback }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const countDown = () => {
      let secondsToGo = 3;

      const instance = modal.success({
        title: 'Thank you for sharing your feedback!',
        content: `We appreciate your time and effort. Your input helps us improve and create a better experience for you. Keep learning and growing!`,
        onOk() {
          router.replace('https://hemskarcodehub.vercel.app')
          
        },
      }
      );
      // setShowFeedBackModel(true);

      // const timer = setInterval(() => {

      //   instance.update({
      //     content: `We appreciate your time and effort. Your input helps us improve and create a better experience for you. Keep learning and growing!`,
      //   });
      // }, 1000);

      // setTimeout(() => {
      //   clearInterval(timer);
      //   instance.destroy();
      //   setShowFeedBackModel(false);
      // });
    };
    countDown()
  };

  const handleSubmitQuiz = async () => {
    if (quizCompleted) return;

    // Calculate final score based on correct answers up to the current question
    const finalScore = totalQuestions.reduce((score, question) => {
      if (question.selectedAnswer === question.correct_answer) {
        return score + 1;
      }
      return score;
    }, 0);

    try {
      const token = getCookie("token") as string;
      const submit = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/student/quiz`,
        {
          quizId: quizData.data._id,
          score: finalScore,
          total: totalQuestions.length,
          answers: totalQuestions.map(question => ({
            // Decode the question when submitting
            question: decodeURIComponent(question.question),
            selectedAnswer: question.selectedAnswer || "Not answered",
            correctAnswer: question.correct_answer,
            isCorrect: question.selectedAnswer === question.correct_answer
          }))
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (submit.data.status) {
        setSubmittedQuiz(submit.data.data);
        setQuizCompleted(true);
        setShowResult(true);
        setCorrectAnswers(finalScore); // Update correctAnswers state
        localStorage.removeItem('quizProgress');

        modal.success({
          title: submit.data.message,
          content: `Your final score: ${finalScore}/${totalQuestions.length}`,
          onOk() { }
        });
      }
    } catch (error) {
      
      modal.error({
        title: 'Submission Failed',
        content: 'Failed to save your quiz results. Please try again.',
      });
    }
  };

  const [isQuizActive, setIsQuizActive] = useState(true);
  const [quizEnded, setQuizEnded] = useState(false);

  // Modify visibility change handler to only handle tab switches
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.hidden && !quizCompleted) {  // Add check for quizCompleted
        setIsQuizActive(false);
        setQuizEnded(true);
        setShowResult(true);  // Show the results immediately

        // Calculate final score
        const finalScore = totalQuestions.reduce((score, question) => {
          if (question.selectedAnswer === question.correct_answer) {
            return score + 1;
          }
          return score;
        }, 0);

        // Update the states before submitting
        setCorrectAnswers(finalScore);
        setQuizCompleted(true);

        try {
          const token = getCookie("token") as string;
          const submit = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/student/quiz`,
            {
              quizId: quizData.data._id,
              score: finalScore,
              total: totalQuestions.length,
              answers: totalQuestions.map(question => ({
                question: question.question,
                selectedAnswer: question.selectedAnswer || "Not answered",
                correctAnswer: question.correct_answer,
                isCorrect: question.selectedAnswer === question.correct_answer
              }))
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          if (submit.data.status) {
            setSubmittedQuiz(submit.data.data);
            localStorage.removeItem('quizProgress');

            // Show modal when returning to tab
            setTimeout(() => {
              modal.warning({
                title: 'Quiz Ended',
                content: `Quiz ended due to tab switch. Your final score: ${finalScore}/${totalQuestions.length}`,
                onOk() { }
              });
            }, 500);
          }
        } catch (error) {
          
          modal.error({
            title: 'Submission Failed',
            content: 'Failed to save your quiz results. Please try again.',
          });
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [totalQuestions, quizCompleted]);

  const progressPercentage = (correctAnswers / totalQuestions.length) * 100
  const getStatus = (percentage) => {
    if (percentage >= 70 && percentage <= 100) {
      return "active";
    } else if (percentage > 32 && percentage < 70) {
      return "normal";
    } else if (percentage < 33) {
      return "exception";
    }
  };

  return (
    <div className="mt-8 h-full w-full px-4 sm:px-6 lg:px-8 dark:bg-boxdark">
      <h1 className="text-xl sm:text-2xl text-center mb-4 dark:text-white">Quiz Application</h1>
      <div className="h-full">
        <div className="h-full">
          {!showResult ? (
            <div className="bg-white dark:bg-meta-4 rounded-sm border border-stroke dark:border-strokedark shadow-default p-8 sm:p-6 ">
              {/* Progress bar */}
              <div className="mb-4 bg-slate-200 dark:bg-boxdark rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(value / totalQuestions?.length) * 100}%` }}
                ></div>
              </div>

              {/* Question header */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
                <h3 className="text-lg sm:text-xl font-medium text-black dark:text-white">
                  Question {currentQuestionIndex + 1} of {totalQuestions.length}
                </h3>
                <div className="flex items-center gap-2 text-black dark:text-white">
                  <FieldTimeOutlined />
                  <span>{seconds} seconds</span>
                </div>
              </div>

              {/* Difficulty stars */}
              <div className="flex justify-center mb-6">
                {[...Array(3)].map((_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    className={`text-xl ${(questions[currentQuestionIndex]?.difficulty === "hard" && index < 3) ||
                      (questions[currentQuestionIndex]?.difficulty === "medium" && index < 2) ||
                      (questions[currentQuestionIndex]?.difficulty === "easy" && index < 1)
                      ? "text-warning"
                      : "text-slate-300 dark:text-strokedark"
                      }`}
                    icon={faStar}
                  />
                ))}
              </div>

              {/* Question text */}
              <div className="mb-8">
                <p className="text-lg text-black dark:text-white">
                  {decodeURIComponent(totalQuestions[currentQuestionIndex]?.question)}
                </p>
              </div>

              {/* Answer options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {totalQuestions[currentQuestionIndex]?.incorrect_answers.map((option: any, index: number) => (
                  <div key={index} className="w-full">
                    <button
                      onClick={() => handleOptionSelect(option)}
                      className={`w-full min-h-[48px] px-4 py-3 rounded-lg text-left transition duration-300 border
                        ${option === selectedOption
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white dark:bg-meta-4 text-black dark:text-white border-stroke dark:border-strokedark hover:bg-gray-2 dark:hover:bg-meta-3'
                        }`}
                    >
                      {option}
                    </button>
                  </div>
                ))}
              </div>

              {/* Navigation button */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={totalQuestions.length === currentQuestionIndex + 1 ? handleSubmitQuiz : handleNextQuestion}
                  disabled={!clicked}
                  className={`px-6 py-2 rounded-lg font-medium transition duration-300
                    ${clicked
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-gray-2 dark:bg-meta-4 text-body dark:text-bodydark cursor-not-allowed'
                    }`}
                >
                  {totalQuestions.length === currentQuestionIndex + 1 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-white dark:bg-boxdark rounded-lg shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center dark:text-white">Quiz Result</h2>
              <p className="mb-4 text-center dark:text-white">
                You scored {correctAnswers} out of {questions.length}
              </p>
              <div className="flex justify-center mb-6">
                <Progress
                  percent={(correctAnswers / totalQuestions.length) * 100}
                  status={getStatus((correctAnswers / totalQuestions.length) * 100)}
                  format={(percent) => `${percent} %`}
                  type="circle"
                  size={100}
                />
              </div>

              <div className="mt-8">
                <h3 className="text-lg sm:text-xl font-bold mb-4 dark:text-white">Questions Review</h3>
                {totalQuestions.map((question, index) => (
                  <div key={index} className="mb-6 p-3 sm:p-4 rounded-lg bg-white dark:bg-boxdark-2 shadow-sm">
                    <h4 className="font-bold mb-2 text-sm sm:text-base dark:text-white">Question {index + 1}:</h4>
                    <p className="mb-3 text-sm sm:text-base dark:text-white">{decodeURIComponent(question.question)}</p>

                    <div className="space-y-2">
                      {question.incorrect_answers.map((answer, ansIndex) => {
                        const isCorrect = answer === question.correct_answer;
                        const wasSelected = answer === question.selectedAnswer;
                        const noAnswerSelected = !question.selectedAnswer && isCorrect;

                        return (
                          <div
                            key={ansIndex}
                            className={`p-2 sm:p-3 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2
                              ${isCorrect
                                ? 'bg-green-50 dark:bg-green-900/20 border border-green-500'
                                : wasSelected
                                  ? 'bg-red-50 dark:bg-red-900/20 border border-red-500'
                                  : 'bg-gray-50 dark:bg-boxdark border border-gray-200 dark:border-gray-700'
                              }`}
                          >
                            <span className="text-sm sm:text-base break-words dark:text-white">{answer}</span>
                            <span className="text-sm sm:text-base whitespace-nowrap">
                              {isCorrect && <span className="text-green-600 dark:text-green-400">✓ Correct Answer</span>}
                              {wasSelected && !isCorrect && <span className="text-red-600 dark:text-red-400">✗ Your Answer</span>}
                              {noAnswerSelected && <span className="text-red-600 dark:text-red-400">Not Attempted</span>}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-6">
                <Button
                  onClick={() => setIsFeedbackModalVisible(true)}
                  className="bg-primary text-white hover:bg-primary/90 fixed bottom-11"
                >
                  Submit Feedback
                </Button>
              </div>

              <Modal
                title="Feedback"
                visible={isFeedbackModalVisible}
                onOk={handleFeedbackSubmit}
                onCancel={() => setIsFeedbackModalVisible(false)}
                className="dark:bg-boxdark"
              >
                <Input.TextArea
                  value={feedback}
                  onChange={handleFeedbackChange}
                  placeholder="Enter your feedback"
                  rows={4}
                  className="dark:bg-boxdark-2 dark:text-white dark:border-gray-700"
                />
              </Modal>
            </div>
          )}
        </div>
      </div>
      {contextHolder}
    </div>
  );
};

export default QuizApp;
