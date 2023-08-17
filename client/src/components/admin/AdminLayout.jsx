import Sidebar from "./sidebar/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <main>
        <Sidebar />
        <div className='content ml-72 p-10'>{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
