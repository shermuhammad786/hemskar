"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";


const FrontEndCourse = () => {
  return (
    <>
      <Breadcrumb pageName="FRONTEND COURSE" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">

        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                HTML 5
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <p>In HTML, we cover the basics of structuring web pages, semantic tags, and building well-organized content. You will also learn advanced concepts, including forms, multimedia integration, and SEO-friendly practices.</p>
              </div>
              <div>
                <h1>Durations 2 Weeks</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                CSS 3
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <p>In CSS, we start with fundamental styling concepts like colors, fonts, and layouts, and progress to advanced techniques such as responsive design, animations, and CSS Grid/Flexbox for dynamic, modern websites.</p>
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
                TYPESCRIPT
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <p>In TypeScript, we begin with the essentials, like understanding static types, interfaces, and type annotations. As we progress, you’ll master advanced features such as generics, enums, decorators, and type inference. TypeScript empowers you to write cleaner, more reliable, and scalable code for any application.</p>
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
                NEXTJS
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <p>In Next.js, we start by exploring its powerful file-based routing and static page generation. Then, we dive into advanced topics like server-side rendering (SSR), API routes, and dynamic content. Learn how to build lightning-fast, SEO-optimized web apps with the latest Next.js features.</p>
              </div>
              <div>
                <h1>Durations 2 Month</h1>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default FrontEndCourse;
