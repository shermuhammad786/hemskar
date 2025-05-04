'use client'
import React, { useState } from "react";
import "./signup.css"
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFan } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";

const SignUp: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false)
  const [modal, contextHolder] = Modal.useModal();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    dateOfBirth: "",
    gender: "",
    username: "",
    email: "",
    password: "",
    r_password: "",
    qualification: "",
    laptop: "",
    course: "",
  });
  const router = useRouter()
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.city || !formData.course || !formData.dateOfBirth || !formData.email || !formData.gender || !formData.laptop || !formData.name || !formData.password || !formData.phone || !formData.qualification || !formData.username) {
      return modal.info({ title: "All fields are required" });
      return;
    }
    if (formData.password !== formData.r_password) {
      return modal.info({ title: "Password and confirm password does not match" });
    }

    try {
      setLoading(true)
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/student/auth/signup`, formData, {
        withCredentials: true
      })
      setLoading(false)


      localStorage.setItem("email", JSON.stringify(formData.email))
      localStorage.setItem('userId', JSON.stringify(res.data.id))
      router.replace("/auth/verifyotp")
      alert("Signup Complete!");
    } catch (error) {
      setLoading(false)
      if (axios.isAxiosError(error)) {
        return modal.info({ title: error.response?.data.message });
      } else {
        return modal.info({ title: 'An unexpected error occurred' });
      }
    }
  };
  return (
    <>
      {/* <Breadcrumb pageName="Sign Up" /> */}

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full lg:block xl:w-1/2">
            <div className="text-center flex justify-center items-center h-full w-full">
              <Image
                className="dark:block rounded-lg mb-10"
                src={"/images/logo/hemskars.png"}
                alt="Logo"
                width={500}
                height={500}
                priority={true}
              />
            </div>
          </div>


          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up to Hemskar
              </h2>

              <div className="max-w-lg mx-auto p-6">
                <form onSubmit={handleSubmit}>
                  {step === 1 && <StepOne formData={formData} handleChange={handleChange} nextStep={nextStep} />}
                  {step === 2 && <StepTwo formData={formData} handleChange={handleChange} prevStep={prevStep} nextStep={nextStep} />}
                  {step === 3 && <StepThree formData={formData} handleChange={handleChange} prevStep={prevStep} nextStep={nextStep} />}
                  {step === 4 && <StepFour formData={formData} prevStep={prevStep} loading={loading} />}
                </form>
              </div>
              <div className="mt-6 text-center">
                <p>
                  Already have an account?{" "}
                  <Link href="/auth/signin" className="text-primary">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {contextHolder}
    </>
  );
};

const StepOne = ({ formData, handleChange, nextStep }: any) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Step 1: Personal Information</h2>

    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        Full Name
      </label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your full name"
        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        Contact Number ('WhatsApp')
      </label>
      <input
        type="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Enter your whatsapp number"
        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        City
      </label>
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="Enter your city"
        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>



    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        Date Of Birth
      </label>
      <input
        type="date"
        name="dateOfBirth"
        value={formData.dob}
        onChange={handleChange}
        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        Gender
      </label>
      <select onChange={handleChange} value={formData.gender} className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" name="gender" id="">
        <option value="" disabled>Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>

    <button
      type="button"
      onClick={nextStep}
      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
    >
      Next
    </button>
  </div>
);

const StepTwo = ({ formData, handleChange, prevStep, nextStep }: any) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Step 2: Security</h2>

    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        Username
      </label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Enter your username"
        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        Email
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        Password
      </label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>
    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        Re-type Password
      </label>
      <input
        name="r_password"
        type="password"
        value={formData.r_password}
        onChange={handleChange}
        placeholder="Re-enter your password"
        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>
    <div className="flex justify-between">
      <button
        type="button"
        onClick={prevStep}
        className="rounded-lg border border-stroke bg-gray-200 py-2 px-6 text-black hover:bg-gray-300"
      >
        Back
      </button>
      <button
        type="button"
        onClick={nextStep}
        className="rounded-lg border border-primary bg-primary py-2 px-6 text-white hover:bg-opacity-90"
      >
        Next
      </button>
    </div>
  </div>
);
const StepThree = ({ formData, handleChange, prevStep, nextStep }: any) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Step 2: Qualification</h2>

    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        Last Qualification
      </label>
      <input
        type="text"
        name="qualification"
        value={formData?.qualification}
        onChange={handleChange}
        placeholder="Enter your last qualification"
        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>

    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        Do you have a laptop
      </label>
      <select onChange={handleChange} value={formData?.laptop} className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" name="laptop" id="">
        <option disabled value=''>Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>

    <div className="mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        Course
      </label>
      <select onChange={handleChange} value={formData?.course} className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" name="course" id="">
        <option value="" disabled>Select Course</option>
        <option value="webDevelopment">Web Developement</option>
        {/* <option value="no">No</option> */}
      </select>
    </div>


    <div className="flex justify-between">
      <button
        type="button"
        onClick={prevStep}
        className="rounded-lg border border-stroke bg-gray-200 py-2 px-6 text-black hover:bg-gray-300"
      >
        Back
      </button>
      <button
        type="button"
        onClick={nextStep}
        className="rounded-lg border border-primary bg-primary py-2 px-6 text-white hover:bg-opacity-90"
      >
        Next
      </button>
    </div>
  </div>
);

const StepFour = ({ formData, prevStep, loading }: any) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Step 4: Review and Submit</h2>
    <div className="mb-4">
      <p><strong>Full Name:</strong> {formData.name}</p>
      <p><strong>Username:</strong> {formData.username}</p>
      <p><strong>Email:</strong> {formData.email}</p>
      <p><strong>Password:</strong> {formData.password}</p>
      <p><strong>Contact phone:</strong> {formData.phone}</p>
      <p><strong>City:</strong> {formData.city}</p>
      <p><strong>Date of Birth:</strong> {formData.dateOfBirth}</p>
      <p><strong>Gender:</strong> {formData.gender}</p>
      <p><strong>Last Qualification:</strong> {formData.qualification}</p>
      <p><strong>Have Laptop:</strong> {formData.laptop}</p>
      <p><strong>Course:</strong> {formData.course}</p>
    </div>
    <div className="flex justify-between">
      <button
        type="button"
        onClick={prevStep}
        className="rounded-lg border border-stroke bg-gray-200 py-2 px-6 text-black hover:bg-gray-300"
      >
        Back
      </button>
      <button
        type="submit"
        className="rounded-lg border border-primary bg-primary py-2 px-6 text-white hover:bg-opacity-90"
      >
        Submit {loading && <FontAwesomeIcon className="loadingButton" icon={faFan} />}
      </button>
    </div>

  </div>
);



export default SignUp;
