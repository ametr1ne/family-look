import React from "react";

const UserItem = ({ user }) => {
  return (
    <li className='grid grid-cols-4 cursor-pointer transition-all duration-200 hover:shadow-zinc-200 hover:shadow-lg items-center px-4 py-2 border border-l-2 border-l-black border-transparent'>
      <h4 className='font-bold text-xl'>{user.name}</h4>
      <p className='font-semibold text-sm text-zinc-500'>{user.email}</p>
      <p className='font-semibold text-sm text-zinc-500'>
        {new Date(user.createdAt).toLocaleDateString()},{" "}
        {new Date(user.createdAt).toLocaleTimeString().slice(0, -3)}
      </p>
      <button className='uppercase place-self-end text-red-400 hover:text-red-500 font-semibold'>
        Удалить
      </button>
    </li>
  );
};

export default UserItem;
