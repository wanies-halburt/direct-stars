import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import React from 'react'
import CreateAdminForm from './CreateAdminForm'
import AdminTable from './AdminTable'

const AdminMembers = () => {
  return (
    <div>
        <PageBreadcrumb pageTitle="List of Admin Members" />
        <CreateAdminForm />
        <div className="space-y-6">
        <AdminTable />
        </div>
    </div>
  )
}

export default AdminMembers