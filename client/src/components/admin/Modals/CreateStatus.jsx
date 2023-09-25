"use client";

import Input from "../../UI/input/Input";
import { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { OrderService } from "src/services/Order.service";

const defaultColors = ["blue-400", "green-400", "red-400", "grey-300"];

const CreateStatusModal = ({ opened, setOpened }) => {
  const [status, setStatus] = useState({
    name: "",
    multipleName: "",
    showInDesk: true,
    color: defaultColors[0],
  });

  const handleSubmit = async (e) => {
    const formData = new FormData();

    formData.append("name", status.name);
    formData.append("multipleName", status.multipleName);
    formData.append("showInDesk", status.showInDesk.toString());
    formData.append("color", status.color);

    try {
      await OrderService.createStatus(formData);
      setOpened(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ModalWrapper opened={opened} setOpened={setOpened}>
      <b className='text-2xl font-semibold'>Создать статус заказа</b>

      <form className='flex flex-col max-w-2xl gap-y-4 mt-6'>
        <Input
          placeholder={"Название"}
          type={"text"}
          value={status.name}
          setValue={(e) => setStatus({ ...status, name: e })}
        />
        <Input
          placeholder={"Множественное название(для списков)"}
          type={"text"}
          value={status.multipleName}
          setValue={(e) => setStatus({ ...status, multipleName: e })}
        />
        {/* <Input
          placeholder={"Показывать в канбан-доске"}
          type={"checkbox"}
          value={status.showInDesk}
          setValue={(e) => setStatus({ ...status, showInDesk: e.target.value })}
        /> */}
        <Input
          placeholder={"Цвет"}
          type={"text"}
          value={status.color}
          setValue={(e) => setStatus({ ...status, color: e })}
        />
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

export default CreateStatusModal;
