"use client";

import { ReactNode } from "react";
import Sidebar from "./sidebar/Sidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='h-full max-h-screen'>
      <Sidebar />
      <div className='content ml-72 p-10 h-screen'>{children}</div>
    </main>
  );
};

export default AdminLayout;
