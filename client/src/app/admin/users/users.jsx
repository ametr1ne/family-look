import AdminLayout from "@/components/admin/AdminLayout";
import UsersList from "@/components/admin/users/UsersList";
import { UserService } from "@/services/User.service";

const Users = ({ users }) => {
  console.log(users);
  return <AdminLayout>{users && <UsersList users={users.rows} />}</AdminLayout>;
};

export default Users;

export const getStaticProps = async () => {
  const users = await UserService.getAll();

  if (!users) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      users,
    },
  };
};
