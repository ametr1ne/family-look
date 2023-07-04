import React from "react";
import UserItem from "./UserItem";

const UsersList = ({ users }) => {
  return (
    <div>
      <h3 className='text-4xl font-bold mb-8'>Пользователи</h3>
      <div className='bg-white rounded-md pb-3 px-5'>
        <div className='grid grid-cols-4 px-4 mb-7 border-b-2 border-zinc-100 py-4'>
          <div className='text-xs text-zinc-400'>Имя</div>
          <div className='text-xs text-zinc-400'>Email</div>
          <div className='text-xs text-zinc-400'>Дата регистрации</div>
        </div>
        <ul className='flex flex-col gap-3'>
          {users
            .sort((a, b) => +a.id - +b.id)
            .map((user) => (
              <UserItem user={user} key={user.id} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default UsersList;
