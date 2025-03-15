import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import SubjectsTable from "./SubjectsTable";

export const metadata: Metadata = {
  title: "Subjects | Direct Stars",
  description:
    "List of Subjects in direct stars and subjects allocated to them",
};

export default function Subjects() {
  return (
    <div>
      <PageBreadcrumb pageTitle="List of Subjects" />
      <div className="space-y-6">
        <ComponentCard title="Subjects">
            <SubjectsTable />
        </ComponentCard>
      </div>
    </div>
  );
}
