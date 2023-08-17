"use client";

import React, { useContext, useState } from "react";
// import Head from "next/head";
import Link from "next/link";
import { HOME_URL, LOGIN_URL, REGISTRATION_URL } from "@/utils/consts";
import Input from "@/components/UI/input/Input";
import { UserService } from "@/services/User.service";
import { AuthContext } from "@/contexts/AuthProvider";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuth, setUser } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const { push } = useRouter();

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await UserService.login(email, password);
      setUser(data);
      setIsAuth(true);

      push(HOME_URL);
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  return (
    <>
      {/* <Head>
        <title>FAMILY LOOK | Войти</title>
        <meta
          name='description'
          content='Семейный онлайн-магазин для приобретения одежды под заказ.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head> */}
      <main className='flex flex-col pt-20'>
        <div className='wrapper max-w-xl mx-auto w-full'>
          <div className='title mt-24 mb-5 flex flex-col items-center'>
            <b className='text-3xl font-bold'>Войдите в свой аккаунт</b>
          </div>
          <form className='rounded-xl flex bg-white flex-col mt-12 shadow-xl p-10 w-full mb-24 space-y-5'>
            {error && <p className='text-red-400 text-sm'>{error}</p>}
            <Input value={email} setValue={(e) => setEmail(e)} type={"email"} placeholder='Email' />
            <Input
              value={password}
              setValue={(e) => setPassword(e)}
              type={"password"}
              placeholder='Password'
            />
            <Link
              href={LOGIN_URL}
              className='text-indigo-500 font-semibold ml-auto hover:text-indigo-800'>
              Забыли пароль?
            </Link>
            <button
              onClick={(e) => formSubmit(e)}
              className='bg-zinc-700 hover:bg-zinc-900 transition-colors duration-300 text-white py-2 px-5 rounded-md font-semibold'>
              Войти
            </button>
            <p className='text-center'>
              Уже есть аккаунт?{" "}
              <Link
                href={REGISTRATION_URL}
                className='text-indigo-500 font-semibold hover:text-indigo-800'>
                Зарегистрироваться
              </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
