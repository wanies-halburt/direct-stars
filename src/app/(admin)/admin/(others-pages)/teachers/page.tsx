import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import TeachersTable from "./TeachersTable";
import CreateTeacherForm from "./CreateTeacherForm";

export const metadata: Metadata = {
  title: "Teachers | Direct Stars",
  description:
    "List of Teachers in direct stars and subjects allocated to them",
};

export default function Teachers() {
  return (
    <div>
      <PageBreadcrumb pageTitle="List of Teachers" />
      <CreateTeacherForm />
      <div className="space-y-6">
          <TeachersTable />
      </div>
    </div>
  );
}
