import Link from "next/link";
import { HOME_URL } from "utils/consts";

const ProtectedPage = () => {
  return (
    <main className='h-screen w-full flex flex-col justify-center items-center'>
      <h1 className='text-xl font-bold'>Доступ к этой странице запрещен</h1>
      <Link
        href={HOME_URL}
        className='py-1 bg-slate-800 text-white px-3 rounded-md mt-4 hover:bg-slate-700'>
        На главную
      </Link>
    </main>
  );
};

export default ProtectedPage;
