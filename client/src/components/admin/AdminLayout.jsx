import Sidebar from "./sidebar/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <main className='h-full'>
      <Sidebar />
      <div className='content ml-72 p-10 h-full'>{children}</div>
    </main>
  );
};

export default AdminLayout;
