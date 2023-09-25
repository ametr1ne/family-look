import Input from "../../UI/input/Input";
import { useState } from "react";
import { ProductService } from "src/services/Product.service";

const CreateProduct = ({ opened, setOpened, categories, collections, updateProducts }) => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [coverImg, setCoverImg] = useState(null);

  const selectFile = (e) => {
    setCoverImg(e.target.files[0]);
  };

  const createProduct = async () => {
    console.log({ name, categoryId, collectionId, price, coverImg });

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    categoryId.length > 0 && formData.append("categoryId", categoryId);
    collectionId.length > 0 && formData.append("collectionId", collectionId);
    formData.append("coverImg", coverImg);

    const createdProduct = await ProductService.create(formData);
    updateProducts(createdProduct);
    console.log(createdProduct);
    setOpened(false);
  };

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
        <b className='text-2xl font-semibold'>Создать товар</b>

        <form className='flex flex-col max-w-2xl gap-y-4 mt-6'>
          <Input
            placeholder={"Наименование"}
            type={"text"}
            value={name}
            setValue={(e) => setName(e)}
          />
          <Input
            type={"file"}
            placeholder={"Выберите обложку"}
            onChange={(e) => selectFile(e)}
            value={undefined}
            setValue={undefined}
          />
          <p>Категория</p>
          <select
            className='py-2 outline-none border border-slate-300 rounded-md'
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}>
            <option value={""}>Не выбрано</option>
            {categories &&
              categories.map((item) => (
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
            {collections &&
              collections.map((item) => (
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
            onClick={createProduct}
            className='bg-zinc-700 hover:bg-zinc-900 transition-colors duration-300 text-white py-2 px-5 rounded-md font-semibold'>
            Создать
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
