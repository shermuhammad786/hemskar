'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import { Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFan } from "@fortawesome/free-solid-svg-icons";


// export const metadata: Metadata = {
//   title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

const Assignment = () => {
  const [assignmentLanguages, setAssignmentLanguages] = useState([]) as any
  const [assignmentTitle, setAssignmentTitle] = useState([]) as any
  const [modal, contextHolder] = Modal.useModal();
  const [loading, setLoading] = useState(false)
  const [updateData, setUpdateData] = useState({
    title: '',
    language: '',
    description: '',
    githubLink: '',
    deployLink: '',
  });
  const config = {
    title: 'Please read the blow instructions',
  };
  useEffect(() => {
    const totalAssignment = async () => {
      const token = await getCookie("token") as string;
      // console.log('token: ', token);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ASSIGNMENT_URL}/api/student/assignment/created/assigment`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // console.log('updateData?.language: ', updateData?.language);
      // console.log('response:total assignments ==>> ', response);
      setAssignmentLanguages(response.data.data);
      return response;
    };
    totalAssignment()
  }, [])
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "language") {
      setUpdateData((prevData) => ({ ...prevData, [name]: value, title: '' }));
      setAssignmentTitle(assignmentLanguages.filter((assignment: any) => assignment.language === value));
    } else {
      setUpdateData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const submitAssignment = async () => {
    setLoading(true)
    // console.log('updateData: ', updateData);
    if (!updateData.language || !updateData.title || !updateData.description || !updateData.githubLink) {
      const config = {
        title: "Please fill all the fields",
      };
      modal.info(config)
      // alert("Please fill all the fields")
      setLoading(false)
      return
    }
    const token = await getCookie("token") as string;
    // console.log('token: ', token);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ASSIGNMENT_URL}/api/student/assignment`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // console.log('response: ', response);
    const config = {
      title: response.data.message,
    };
    modal.info(config);
    setLoading(false)
    // alert(response.data.message)
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="ASSIGNMENTS" />
      {contextHolder}
      <div className="w-full h-full">

        <div className="flex flex-col w-full h-full gap-9 cursor-pointer" >
          <div className="rounded-sm border flex w-full flex-wrap border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

            <div className="mb-5.5 p-4 w-full">
              <label
                className="mb-3 block text-xl ml-2 font-medium text-black dark:text-white"
                htmlFor="Language"
              >
                Language
              </label>
              <select required onChange={handleInputChange} name="language" id="Title" className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
                <option value="" selected disabled>Select</option>
                {
                  assignmentLanguages && assignmentLanguages.map((assignment: any, index: number) => (
                    <option key={index} value={assignment?.language}>{assignment?.language}</option>

                  ))
                }
                {/* <option value="abc">abc</option>
                <option value="abc">abc</option>
                <option value="abc">abc</option> */}
              </select>
            </div>

            <div className="mb-5.5 p-4 w-full">
              <label
                className="mb-3 block text-xl ml-2 font-medium text-black dark:text-white"
                htmlFor="Title"
              >
                Title
              </label>
              <select
                required
                onChange={handleInputChange}
                name="title"
                id="Title"
                value={updateData.title}
                className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              >
                <option value="" selected disabled>Select</option>
                {
                  assignmentTitle && assignmentTitle.map((assignment: any, index: number) => (
                    assignment?.title.map((title: any, index: number) => (
                      <option key={index} value={title}>{title}</option>
                    ))
                  ))
                }
              </select>
            </div>

            <div className="mb-5.5 p-4 w-full">
              <label
                className="mb-3 block text-xl ml-2 font-medium text-black dark:text-white"
                htmlFor="description"
              >
                Description
              </label>
              <input
                required
                className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="description"
                id="description"
                placeholder="Used basic tags and attributes"
                defaultValue={""}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-5.5 p-4 w-full">
              <label
                className="mb-3 block text-xl ml-2 font-medium text-black dark:text-white"
                htmlFor="githubLink"
              >
                GitHub Repository URL
              </label>
              <input
                required
                className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="githubLink"
                id="githubLink"
                placeholder="https:github.com/assignment01"
                defaultValue={""}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-5.5 p-4 w-full">
              <label
                className="mb-3 block text-xl ml-2 font-medium text-black dark:text-white"
                htmlFor="deployLink"
              >
                Deployed URL
              </label>
              <input
                required
                className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                name="deployLink"
                id="deployLink"
                placeholder="https:assignment01.netlify.app"
                defaultValue={""}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-5.5 p-4 w-full">
              <button onClick={submitAssignment} className="w-full border rounded p-6 bg-boxdark dark:bg-white  hover:dark:bg-boxdark hover:bg-white hover:dark:text-white hover:text-black px-4.5 py-3 dark:text-black text-white hover:underline text-2xl font-bold">SUBMIT {loading && <FontAwesomeIcon className="loadingButton" icon={faFan} ></FontAwesomeIcon>} </button>
            </div>

          </div>
        </div>

      </div>
    </DefaultLayout>
  );
};

export default Assignment;
