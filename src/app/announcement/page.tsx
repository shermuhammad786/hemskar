import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Announcement = () => {
  const announcements = [
    {
      title: "🚀 New Course: HTML Foundations",
      description: "Kickstart your web development journey with our beginner-friendly HTML course. Learn the basics and start building websites from scratch. Starts on [Date].",
      date: "2024-12-01", // Optional: Add a date field
    },
    {
      title: "🎉 Weekend Classes Schedule",
      description: "Join us every Saturday and Sunday from 9:00 to 11:00 AM for interactive coding sessions. Designed to fit perfectly into your busy schedule.",
      date: "2024-11-25",
    },
    {
      title: "📢 Live Session: TypeScript Basics",
      description: "Don't miss our live session on TypeScript, where you'll learn to add type safety and robustness to your JavaScript code. Happening on [Date], at 5:00 PM.",
      date: "2024-11-29",
    },
    {
      title: "💻 Student Projects Showcase",
      description: "Check out the amazing projects built by our students. Get inspired and start working on your own projects to showcase your skills!",
      date: "2024-12-05",
    },
    {
      title: "🏆 Contest Alert: MERN Stack Challenge",
      description: "Participate in our MERN Stack Challenge and stand a chance to win exciting prizes! Submission deadline: [Date].",
      date: "2024-12-15",
    },
  ];

  return (
    <DefaultLayout>

      <Breadcrumb pageName="ANNOUNCEMENT" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">

        {announcements.map((announce: any, index: any) => (

          <div key={index} className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  {announce.title}
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <p>{announce.description}</p>
                </div>
                <div>
                  <h1>{announce.date}</h1>
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

export default Announcement;
