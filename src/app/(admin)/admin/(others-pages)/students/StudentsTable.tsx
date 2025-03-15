import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table";

import Badge from "../../../../../components/ui/badge/Badge";
import Image from "next/image";

interface Order {
  id: number;
  student: {
    image: string;
    name: string;
    role: string;
  };
  class: string;
  average: number;
  status: string;
  noOfSubjects: string;
}

// Define the table data using the interface
const tableData: Order[] = [
  {
    id: 1,
    student: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Head Girl",
    },
    class: "SS2",
    average: 71,
    noOfSubjects: "9",
    status: "B",
  },
  {
    id: 2,
    student: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      role: "Labour prefect",
    },
    class: "SS1",
    average: 81,
    noOfSubjects: "9",
    status: "A",
  },
  {
    id: 3,
    student: {
      image: "/images/user/user-17.jpg",
      name: "Zain Geidt",
      role: "Time keeper",
    },
    class: "JSS3",
    average: 61,
    noOfSubjects: "14",
    status: "B",
  },
  {
    id: 4,
    student: {
      image: "/images/user/user-20.jpg",
      name: "Abram Schleifer",
      role: "Punctuality Prefect",
    },
    class: "JSS2",
    average: 65,
    noOfSubjects: "14",
    status: "B",
  },
  {
    id: 5,
    student: {
      image: "/images/user/user-21.jpg",
      name: "Carla George",
      role: "Library Prefect",
    },
    class: "SS3",
    average: 51,
    noOfSubjects: "9",
    status: "C",
  },
];

export default function StudentsTable() {
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
                  Student
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Class
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Cumulative Average
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  No of Subjects
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
                          src={order.student.image}
                          alt={order.student.name}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {order.student.name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order.student.role}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.class}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {order.average}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        order.status === "A"
                          ? "success"
                          : order.status === "B" || "C"
                          ? "warning"
                          : "error"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {order.noOfSubjects}
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
