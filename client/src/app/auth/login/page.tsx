"use client";

import Input from "components/UI/input/Input";
import { AuthContext } from "contexts/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";
import { UserService } from "services/User.service";
import { HOME_URL, LOGIN_URL, REGISTRATION_URL } from "utils/consts";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuth, setUser } = useContext(AuthContext);

  const { push } = useRouter();

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await UserService.login(email, password);
      data && setUser(data);
      setIsAuth(true);

      push(HOME_URL);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className='flex flex-col pt-20'>
      <div className='wrapper max-w-xl mx-auto w-full'>
        <div className='title mt-24 mb-5 flex flex-col items-center'>
          <b className='text-3xl font-bold'>Войти</b>
        </div>
        <form
          onSubmit={(e) => formSubmit(e)}
          className='rounded-xl flex bg-white flex-col mt-12 shadow-xl p-10 w-full mb-24 space-y-5'>
          <Input value={email} setValue={(e) => setEmail(e)} type={"email"} placeholder='Email' />
          <Input
            value={password}
            setValue={(e) => setPassword(e)}
            type={"password"}
            placeholder='Пароль'
          />
          <Link
            href={LOGIN_URL}
            className='text-indigo-500 font-semibold ml-auto hover:text-indigo-800'>
            Забыли пароль?
          </Link>
          <button className='bg-zinc-700 hover:bg-zinc-900 transition-colors duration-300 text-white py-2 px-5 rounded-md font-semibold'>
            Войти
          </button>
          <p className='text-center'>
            Еще нет аккаунта?{" "}
            <Link
              href={REGISTRATION_URL}
              className='text-indigo-500 font-semibold hover:text-indigo-800'>
              Зарегистрироваться
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
