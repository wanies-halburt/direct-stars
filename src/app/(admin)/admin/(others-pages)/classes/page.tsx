
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import ClassesTable from "./ClassTable";
import CreateClassForm from "./CreateClassesForm";

export const metadata: Metadata = {
  title: "Classes | Direct Stars",
  description:
    "List of classes in direct stars",
  // other metadata
};

export default function Classes() {
  return (
    <div>
      <PageBreadcrumb pageTitle="List of Classes" />
      <CreateClassForm />
      <div className="space-y-6">
          <ClassesTable />
      </div>
    </div>
  );
}