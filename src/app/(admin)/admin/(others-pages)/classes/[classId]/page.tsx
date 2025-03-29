"use client"

import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import React from 'react'
import StudentsTable from '../../students/StudentsTable'
import { useParams } from 'next/navigation'

const StudentsByClass = () => {
    const params = useParams()
    console.log("params", params)

  return (
    <div>
      <PageBreadcrumb pageTitle={`List of Students in ${params.classId}`} />
      <div className="space-y-6">
          <StudentsTable />
      </div>
    </div>
  )
}

export default StudentsByClass
