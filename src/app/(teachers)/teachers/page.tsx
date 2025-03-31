import type { Metadata } from "next";
import React from "react";
import { dummyQuestionList } from "./teachers.helpers";
import { BoxIconLine } from "@/icons";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Direct Stars",
  description: "",
};

export default function Ecommerce() {
  return (
    <div>
      <h2
        className="text-xl font-semibold text-gray-800 dark:text-white/90"
        x-text="pageName"
      >Question Bank
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 mt-5">
        {dummyQuestionList.map((res, id) => (
              <Link href={`/teachers/subject/${res.id}`} key={id} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 cursor-pointer">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <BoxIconLine className="text-gray-800 dark:text-white/90" />
              </div>
      
              <div className="flex items-end justify-between mt-5">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {res.subject}
                  </span>
                  <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    {res.class}
                  </h4>
                </div>
                <div>
                  <p className="font-bold text-gray-700 text-sm">Approved: <span className="text-base text-gray-800 dark:text-white/90">{res.questions_approved}</span></p>
                  <p className="font-bold text-gray-700 text-sm">Pending: <span className="text-base text-gray-800 dark:text-white/90">{res.questions_pending}</span></p>
                </div>
                {/* <Badge color="success">
                  <ArrowUpIcon />
                  11.01%
                </Badge> */}
              </div>
            </Link>
        ))}
      </div>
    </div>
  );
}
