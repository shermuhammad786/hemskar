'use client'
import { Modal } from "antd";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const VerifyOtp: React.FC = () => {
    const [modal, contextHolder] = Modal.useModal();
    const [otpKey, setOtpKey] = useState("")
    const [resendOTP, setResendOTP] = useState(false)
    const [resendOTPTime, setresendOTPTime] = useState(0)
    const [email, setEmail] = useState("")
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            if (resendOTPTime <= 0) return setResendOTP(true)
            if (resendOTPTime > 0) {
                setresendOTPTime(resendOTPTime - 1)
            }


        }, 15 * 100);
    }, [resendOTPTime])
    const router = useRouter()
    const config = {
        title: 'Verificaiotn is in process',
        content: (
            <>
                <h2 className="text-lg font-semibold mb-2">OTP Verificaiotn successfully completed</h2>
                <h2 className="text-lg font-semibold mb-2">Please wait, we send you confirmation email</h2>
                <h2 className="text-lg font-semibold mb-2 text-center">Congratulations! you are now student of Hemskar Code Hub 😊</h2>
            </>
        ),
        onOk() {
            router.replace("/auth/signin")
        },

    };
    const updateEmailConfig = {
        title: 'Please provide the correct gmail',
        content: (
            <>
                <input defaultValue={email} className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary" type="text" onChange={(e) => setEmail(e.target.value)} />
            </>
        ),
        onOk() {
            updateEmailHandler()
        },

    };
    const resendOTPHandler = async () => {
        setResendOTP(false)
        setresendOTPTime(60)
        // const email = JSON.parse(localStorage.getItem("email") as string)
        // console.log('email: ', email);
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/student/auth/resend/otp`, { email })
        if (res.data.status) {
            alert(res.data.message)
        } else {
            alert(res.data.message)
        }
    }
    const handleVerifyOtp = async () => {
        const email = JSON.parse(localStorage.getItem("email") as string)

        const route = `${process.env.NEXT_PUBLIC_API_URL}/api/student/auth/verify/otp`
        const res: any = await axios.post(route, { otpKey, email })
        // console.log('res: ', res);

        if (res.data.status) {
            return modal.info(config);
        } else {
            return modal.info({ title: res.data.message });
        }
    }
    const updateEmailHandler = async () => {
        setOpen(false)
        const id = JSON.parse(localStorage.getItem("userId") as string)
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/student/auth/wrong/email/${id}`, { email })
        if (res.data.status) {
            alert(res.data.message)
            localStorage.setItem("email", JSON.stringify(email))
        } else {
            alert(res.data.message)
        }
    }
    useEffect(() => {
        const email = JSON.parse(localStorage.getItem("email") as string)
        setEmail(email)
    }, [])
    return (
        <div className="w-full flex justify-center h-screen p-4">
            <div className="max-w-[500px] ">
                <Image src={"/images/logo/hemskar1.png"} width={500} height={500} priority={true} alt="" />
                <h2 className="text-xl font-semibold mb-4"></h2>
                <p className="mb-4">
                    An OTP has been sent to your email {email}. Please enter it below to verify your email address.
                </p>
                <h1>Didn't receive the OTP? Double-check your email address or <span className="text-blue-700 font-bold underline cursor-pointer" onClick={() => setOpen(true)}>update it here.</span></h1>
                <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                        OTP
                    </label>
                    <input
                        type="number"
                        value={otpKey}
                        onChange={(e) => setOtpKey(e.target.value)}
                        placeholder="Enter OTP"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <h1 onClick={resendOTPHandler} className="mb-2.5 block font-medium text-black dark:text-white cursor-pointer">Resend OTP</h1>
                    <h1 className="mb-2.5 block font-medium text-black dark:text-white cursor-pointer">{resendOTPTime}</h1>

                </div>
                <button
                    onClick={handleVerifyOtp}
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary py-4 text-white transition hover:bg-opacity-90"
                >
                    Verify
                </button>
                {contextHolder}
            </div>

            <Modal
                title="Modal 1000px width"
                centered
                open={open}
                onOk={() => updateEmailHandler()}
                onCancel={() => setOpen(false)}
                width={600}
            >
                <p>Please put the correct email</p>
                <input defaultValue={email} className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary" type="email" onChange={(e) => setEmail(e.target.value)} />
            </Modal>


        </div>
    );

}

export default VerifyOtp