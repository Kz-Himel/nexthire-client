import DashboardSidebar from "./components/DashboardSidebar"
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div className="flex min-h-screen">
            <DashboardSidebar />
            <div>{children}</div>
        </div>
    )
}

export default DashboardLayout;