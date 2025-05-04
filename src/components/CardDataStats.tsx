import axios from "axios";
import { getCookie } from "cookies-next";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  children: ReactNode;
}
const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
}) => {


  return (
    <Link href={title.includes('Assignments') ? '/assignments/list' : '#'}>
      <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          {children}
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-title-md font-bold text-black dark:text-white">
              {total}
            </h4>
            <span className="text-sm font-medium">{title}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardDataStats;
