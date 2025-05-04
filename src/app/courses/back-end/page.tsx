import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const FormLayout = () => {
  return (
    <DefaultLayout>

      <Breadcrumb pageName="BACKEND COURSE" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">

        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                NODEJS
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <p>In Node.js, you’ll learn how to run JavaScript on the server to build fast and scalable applications. Starting from the basics, like handling files and working with modules, we’ll move to creating powerful backend systems with ease.</p>
              </div>
              <div>
                <h1>Durations 1 Month</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                EXPRESSJS
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <p>In Express.js, we cover creating and managing routes, implementing middleware, and building secure and efficient RESTful APIs. You’ll also learn how to handle authentication and error management in web applications.</p>
              </div>
              <div>
                <h1>Durations 3 Month</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                MONGODB
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <p>In MongoDB, you’ll start with the basics of creating collections and performing CRUD operations. Then, you’ll explore schema design, aggregation pipelines, and indexing for performance optimization. MongoDB makes handling unstructured data flexible and efficient, perfect for modern applications.</p>
              </div>
              <div>
                <h1>Durations 2 Month</h1>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
