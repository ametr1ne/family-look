"use client";

import { useContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../../contexts/AuthProvider";
import Input from "components/UI/input/Input";
import { UserService } from "services/User.service";
import { HOME_URL, LOGIN_URL } from "utils/consts";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser, setIsAuth } = useContext(AuthContext);

  const { push } = useRouter();

  const formSubmit = async () => {
    try {
      const response = await UserService.registration(name, email, password);
      response && setUser(response);
      setIsAuth(true);
      push(HOME_URL);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Head>
        <title>FAMILY LOOK | Регистрация</title>
        <meta
          name='description'
          content='Семейный онлайн-магазин для приобретения одежды под заказ.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main className='flex flex-col pt-20'>
        <div className='wrapper max-w-xl mx-auto w-full'>
          <div className='title mt-24 mb-5 flex flex-col items-center'>
            <b className='text-3xl font-bold'>Регистрация</b>
          </div>
          <form className='rounded-xl flex bg-white flex-col mt-12 shadow-xl p-10 w-full mb-24 space-y-5'>
            <Input type='text' placeholder='Имя' value={name} setValue={(e) => setName(e)} />
            <Input type='email' placeholder='Email' value={email} setValue={(e) => setEmail(e)} />
            <Input
              type='password'
              placeholder='Пароль'
              value={password}
              setValue={(e) => setPassword(e)}
            />
            <button
              type='button'
              onClick={formSubmit}
              className='bg-zinc-700 hover:bg-zinc-900 transition-colors duration-300 text-white py-2 px-5 rounded-md font-semibold'>
              Зарегистрироваться
            </button>
            <p className='text-center'>
              Уже есть аккаунт?{" "}
              <Link
                href={LOGIN_URL}
                className='text-indigo-500 font-semibold hover:text-indigo-800'>
                Войдите
              </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
};

export default RegistrationPage;
