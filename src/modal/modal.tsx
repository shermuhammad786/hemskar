import { Modal } from "antd"
import { deleteCookie } from "cookies-next"
import { useRouter } from "next/router"

export const newModal = (quizDuration?: any) => {
    const Unauthorized = {
        title: 'Login Expire: Please login again.'
    }
    const WrongQuizCode = {
        title: '❌ Invalid quiz code. Please try again.',
    }
    const RightQuizCode = {
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
    }


    return {
        Unauthorized,
        WrongQuizCode,
        RightQuizCode,
    }
}


export const tryCatch = async (error: any, modal?: any, router?: any) => {
    if (error.response && error.response.status === 401) {
        await modal.info(newModal().Unauthorized);
        deleteCookie("token")
        router.replace("/auth/signin")
    } else {
        await modal.info({ title: 'Something went wrong' });
        router.replace("/auth/signin")
        deleteCookie("token")
    }
}