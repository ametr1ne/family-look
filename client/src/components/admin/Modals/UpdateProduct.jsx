import Input from "../../UI/input/Input";
import { useEffect, useState } from "react";
import { ProductService } from "@/services/Product.service";

const UpdateProduct = ({ currentData, opened, setOpened, categories, collections }) => {
  const [name, setName] = useState(currentData.name);
  const [categoryId, setCategoryId] = useState(currentData.categoryId);
  const [price, setPrice] = useState(currentData.price);
  const [collectionId, setCollectionId] = useState(currentData.collectionId);
  const [coverImg, setCoverImg] = useState(currentData.coverImg);
  const [id, setId] = useState(currentData.id);

  const selectFile = (e) => {
    setCoverImg(e.target.files[0]);
  };

  const updateProduct = async () => {
    console.log({ id, name, categoryId, collectionId, price, coverImg });

    const formData = new FormData();

    formData.append("id", id);
    formData.append("name", name);
    formData.append("price", price);
    categoryId.length > 0 && formData.append("categoryId", categoryId);
    collectionId.length > 0 && formData.append("collectionId", collectionId);
    formData.append("coverImg", coverImg);

    const updated = await ProductService.update(formData);
    console.log(updated);
    setOpened(false);
  };

  useEffect(() => {
    setId(currentData.id);
    setName(currentData.name);
    setCategoryId(currentData.categoryId);
    setPrice(currentData.price);
    setCollectionId(currentData.collectionId);
    setCoverImg(currentData.coverImg);
  }, [currentData]);

  return (
    <div
      onClick={() => setOpened(false)}
      className={`fixed inset-0 bg-black bg-opacity-50 z-30 flex justify-center items-center transition-all duration-500 ${
        opened ? "visible opacity-100" : "opacity-0 invisible"
      }`}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`content bg-white p-16 rounded-lg transition-all duration-500 ${
          opened ? "scale-100" : "scale-75"
        }`}>
        <b className='text-2xl font-semibold'>Обновить товар</b>

        <form className='flex flex-col max-w-2xl gap-y-4 mt-6'>
          <Input
            placeholder={"Наименование"}
            type={"text"}
            value={name}
            setValue={(e) => setName(e)}
          />
          <Input type={"file"} placeholder={"Выберите обложку"} onChange={(e) => selectFile(e)} />
          <p>Категория</p>
          <select
            className='py-2 outline-none border border-slate-300 rounded-md'
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}>
            <option value={""}>Не выбрано</option>
            {categories.map((item) => (
              <option className='h-6' key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <p>Коллекция</p>
          <select
            className='py-2 outline-none border border-slate-300 rounded-md'
            value={collectionId}
            onChange={(e) => setCollectionId(e.target.value)}>
            <option value={""}>Не выбрано</option>
            {collections.map((item) => (
              <option className='h-6' key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <Input
            placeholder={"Цена, руб."}
            type={"number"}
            value={price}
            setValue={(e) => setPrice(e)}
          />
          <button
            type='button'
            onClick={updateProduct}
            className='bg-zinc-700 hover:bg-zinc-900 transition-colors duration-300 text-white py-2 px-5 rounded-md font-semibold'>
            Обновить
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
