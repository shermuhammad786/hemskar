'use client'
import Loading from '@/app/loading'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import Quizes from '@/components/Quiz'
import React, { Suspense, useState } from 'react'

export default function QuizStart() {
    // const [code, setCode] = useState('')
    // const [start, setStart] = useState(false)
    // const startQuiz = () => {
    //     const quizCode = "correct code"
    //     if (code === quizCode) {
    //         setStart(true)
    //     } else {
    //         setStart(false)
    //     }
    // }
    return (
        <DefaultLayout>
            <Suspense fallback={<Loading />} />


            {/* <div>
                <input onChange={(e) => setCode(e.target.value)} type="text" />
                <button onClick={startQuiz}>Start Quiz</button>
            </div> */}
            {<Quizes />}
        </DefaultLayout>
    )
}
