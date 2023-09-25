"use client";

import Input from "../../UI/input/Input";
import { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { OrderService } from "src/services/Order.service";

const CreatePaymentStatusModal = ({ opened, setOpened }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);

    try {
      await OrderService.createPaymentStatus(formData);
      setOpened(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ModalWrapper opened={opened} setOpened={setOpened}>
      <b className='text-2xl font-semibold'>Создать статус платежа</b>

      <form className='flex flex-col max-w-2xl gap-y-4 mt-6'>
        <Input placeholder={"Название"} type={"text"} value={name} setValue={(e) => setName(e)} />
        <button
          type='button'
          onClick={handleSubmit}
          className='bg-zinc-700 hover:bg-zinc-900 transition-colors duration-300 text-white py-2 px-5 rounded-md font-semibold'>
          Создать
        </button>
      </form>
    </ModalWrapper>
  );
};

export default CreatePaymentStatusModal;
