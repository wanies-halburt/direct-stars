import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table";

import Image from "next/image";

interface Order {
  id: number;
  teacher: {
    image: string;
    name: string;
    role: string;
  };
  class: string;
  average: number;
  status: string;
  noOfClasses: string;
}

// Define the table data using the interface
const tableData: Order[] = [
  {
    id: 1,
    teacher: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Mathematics",
    },
    class: "SS2",
    average: 71,
    noOfClasses: "9",
    status: "B",
  },
  {
    id: 2,
    teacher: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      role: "Physics",
    },
    class: "SS1",
    average: 81,
    noOfClasses: "9",
    status: "A",
  },
  {
    id: 3,
    teacher: {
      image: "/images/user/user-17.jpg",
      name: "Zain Geidt",
      role: "Agriculture",
    },
    class: "JSS3",
    average: 61,
    noOfClasses: "14",
    status: "B",
  },
  {
    id: 4,
    teacher: {
      image: "/images/user/user-20.jpg",
      name: "Abram Schleifer",
      role: "Creative Arts",
    },
    class: "JSS2",
    average: 65,
    noOfClasses: "14",
    status: "B",
  },
  {
    id: 5,
    teacher: {
      image: "/images/user/user-21.jpg",
      name: "Carla George",
      role: "Biology",
    },
    class: "SS3",
    average: 51,
    noOfClasses: "9",
    status: "C",
  },
];

export default function TeachersTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Teacher
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Subjects
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Role
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  No of Classes
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image
                          width={40}
                          height={40}
                          src={order.teacher.image}
                          alt={order.teacher.name}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {order.teacher.name}
                        </span>
                        {/* <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order.teacher.role}
                        </span> */}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.teacher.role}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {order.average}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {order.noOfClasses}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
