import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import SubjectsTable from "./SubjectsTable";
import CreateSubjectForm from "./CreateSubjectForm";

export const metadata: Metadata = {
  title: "Subjects | Direct Stars",
  description:
    "List of Subjects in direct stars and subjects allocated to them",
};

export default function Subjects() {
  return (
    <div>
      <PageBreadcrumb pageTitle="List of Subjects" />
      <CreateSubjectForm />
      <div className="space-y-6">
            <SubjectsTable />
      </div>
    </div>
  );
}
