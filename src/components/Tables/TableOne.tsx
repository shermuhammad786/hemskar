import { BRAND } from "@/types/brand";
import Image from "next/image";

const brandData: BRAND[] = [
  {
    logo: "/images/brand/brand-06.svg",
    name: "Zoom App",
    duration: "2h",
    date: "9PM to 11PM",
    day: "Sat",
    teacher: "Sher Muhammad",
  },
  {
    logo: "/images/brand/brand-06.svg",
    name: "Zoom App",
    duration: "2h",
    date: "9PM to 11PM",
    day: "Sun",
    teacher: "Mehak Hamid",
  },
  // {
  //   logo: "/images/brand/brand-06.svg",
  //   name: "Zoom App",
  //   duration: "2h",
  //   date: "9PM to 11PM",
  //   day: "Sun",
  //   teacher: "soch lo",
  // },
  // {
  //   logo: "/images/brand/brand-06.svg",
  //   name: "Zoom App",
  //   duration: "2h",
  //   date: "9PM to 11PM",
  //   day: "Sat",
  //   teacher: "soch lo",
  // },
  // {
  //   logo: "/images/brand/brand-06.svg",
  //   name: "Zoom App",
  //   duration: "2h",
  //   date: "9PM to 11PM",
  //   day: "Sat",
  //   teacher: "soch lo",
  // }
];

const TableOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        UpComming Classes
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Source
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Duration
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Time
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Day
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Teahcer
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${key === brandData.length - 1
              ? ""
              : "border-b border-stroke dark:border-strokedark"
              }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <Image src={brand.logo} alt="Brand" width={48} height={48} />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {brand.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.duration}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{brand.date}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.day}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{brand.teacher}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
