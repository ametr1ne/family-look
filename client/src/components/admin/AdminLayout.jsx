import React, { useContext } from "react";
import Sidebar from "./sidebar/Sidebar";
import Head from "next/head";
import { AuthContext } from "@/pages/_app";

const AdminLayout = ({ children }) => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Head>
        <title>Админ-панель</title>
      </Head>
      <main>
        <Sidebar />
        <div className='content ml-72 p-10'>{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
