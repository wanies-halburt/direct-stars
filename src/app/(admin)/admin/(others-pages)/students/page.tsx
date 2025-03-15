import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import StudentsTable from "./StudentsTable";

export const metadata: Metadata = {
  title: "Students | Direct Stars",
  description:
    "List of Students in direct stars",
  // other metadata
};

export default function Students() {
  return (
    <div>
      <PageBreadcrumb pageTitle="List ofStudents" />
      <div className="space-y-6">
        <ComponentCard title="Students">
          <StudentsTable />
        </ComponentCard>
      </div>
    </div>
  );
}
