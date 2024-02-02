import AdminLayout from "components/admin/AdminLayout";
import UsersList from "components/admin/users/UsersList";
import { UserService } from "services/User.service";

const Users = async () => {
  const users = await UserService.getAll();

  return <AdminLayout>{users && <UsersList users={users.rows} />}</AdminLayout>;
};

export default Users;
