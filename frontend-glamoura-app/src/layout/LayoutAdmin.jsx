import React, { useState } from "react";
import HeaderAdmin from "../components/admin/HeaderAdmin";
import Sidebar from "../components/admin/Sidebar";

function LayoutAdmin({children}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <HeaderAdmin
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={handleToggleSidebar}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />
        <main className="flex-1 overflow-auto bg-gray-100 px-3 py-4">
        {children}
        </main>
      </div>
    </div>
  );
}

export default LayoutAdmin;
