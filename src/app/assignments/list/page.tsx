'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import { getAssignments } from "@/app/APIsController/query";

// export const metadata: Metadata = {
//   title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

const AssignmentsDetails = () => {

  const [assingment, setAssignment] = useState([]) as any
  const [assignmentSubmitted, setAssignmentSubmitted] = useState([]) as any

  useEffect(() => {
    const totalAssignment = async () => {
      const token = await getCookie("token") as string;
      // console.log('token: ', token);
      const response = await getAssignments()
      // console.log('updateData?.language: ', updateData?.language);
      console.log('response:total assignments ==>> ', response);
      setAssignment(response.totalAssignments);
      setAssignmentSubmitted(response.submittedAssignments)
      // setAssignmentLanguages(response.data.data);
      return response;
    };
    totalAssignment()
  }, [])


  return (
    <DefaultLayout>

      <Breadcrumb pageName="Assignments Details" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        {assingment?.map((assign: any, i: any) => {
          return (
            assign.title.map((assignNumber: any, index: number) => {
              // Find the matching submission
              const submission = assignmentSubmitted?.find((submitted: any) =>
                assign.language === submitted.language && assignNumber === submitted.title);

              return (
                <div key={index} className="flex flex-col gap-9">
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        {assign.language} {assignNumber}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                      {submission ? (
                        // If submission exists, show the details
                        <div className="flex flex-col gap-5.5 p-6.5">
                          <div className="font-medium text-black dark:text-white">
                            <p>{submission.description}</p>
                          </div>

                          <div className="font-medium text-black dark:text-white flex justify-start gap-3">
                            <span>Github Repository: </span>
                            <h1 className="font-normal">{submission.githubLink}</h1>
                          </div>

                          <div className="font-medium text-black dark:text-white flex justify-start gap-3">
                            <span>Deployed Url: </span>
                            <h1 className="font-normal">{submission.deployLink}</h1>
                          </div>

                          <div className="font-medium text-black dark:text-white flex justify-start gap-3">
                            <span>Submitted At: </span>
                            <h1 className="font-normal">
                              {submission.createdAt ? new Date(submission.createdAt).toDateString() : '-'}
                            </h1>
                          </div>

                          <div className="font-medium text-black dark:text-white flex justify-start gap-3">
                            <span>Submit Progres: </span>
                            <h1 className="font-normal">{submission.submit}</h1>
                          </div>

                        </div>
                      ) : (
                        // If no submission, show 'Not Submitted'
                        <div className="font-bold text-red">
                          <h1>Not Submitted</h1>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          );
        })}
      </div>

    </DefaultLayout >
  );
};

export default AssignmentsDetails;


// <div key={index} className="flex flex-col gap-9">
//   <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//     <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
//       <h3 className="font-medium text-black dark:text-white">
//         {announce.language}
//       </h3>
//     </div>
//     <div className="flex flex-col gap-5.5 p-6.5">
//       <div>
//           <p>{announce.description}</p>
//         </div>

//         <div>
//           <h1>{announce.githubUrl}</h1>
//         </div>

//         <div>
//           <h1>{announce.deployUrl}</h1>
//         </div>

//         <div>
//           <h1>{announce.date}</h1>
//         </div>

//         <div>
//           <h1>{announce.submitted ? "Submitted" : "Not Submitted"}</h1>
//         </div>

//     </div>
//   </div>
// </div>