'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation";


// export const metadata: Metadata = {
//   title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };
const books = [
  {
    id: 1,
    title: "HTML & CSS: The Complete Guide",
    description:
      "Learn the foundational skills of web development with this comprehensive guide to HTML and CSS. Perfect for beginners!",
    fileType: "PDF",
    downloadLink: "/books/html.pdf",
  },
  {
    id: 2,
    title: "JavaScript Essentials",
    description:
      "Unlock the power of dynamic web development with this beginner-friendly JavaScript guide. Start building interactive applications today!",
    fileType: "PDF",
    downloadLink: "/books/javaScript.pdf",
  },
];

const Books = () => {
  const router = useRouter()

  return (
    <DefaultLayout>
      <Breadcrumb pageName="BOOKS" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        {books && books.map((book: any, index: number) => (
          <div key={index} className="flex flex-col gap-9 cursor-pointer" >
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  {book.title}
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <p>{book.description}</p>
                </div>
                <div>
                  {/* <button onClick={() => router.push(book.downloadLink)}>donwload book</button> */}
                  <a href={book.downloadLink}>Download Book</a>
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

export default Books;
