"use client";

import { ProductService } from "services/Product.service";
import Image from "next/image";
import React, { useState, useEffect, Fragment } from "react";
import { CategoryService } from "services/Category.service";
import { CollectionService } from "services/Collection.service";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import AdminLayout from "components/admin/AdminLayout";
import { MaterialService } from "services/Material.service";
import TextButton from "components/UI/button/TextButton";
import { useParams, useRouter } from "next/navigation";
import { ADMIN_URL } from "utils/consts";
import Input from "components/UI/input/Input";
import { Listbox, Transition } from "@headlessui/react";
import Link from "next/link";

const people = [
  {
    id: 1,
    name: "Wade Cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Arlene Mccoy",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    name: "Devon Webb",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
  {
    id: 4,
    name: "Tom Cook",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 5,
    name: "Tanya Fox",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 6,
    name: "Hellen Schmidt",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 7,
    name: "Caroline Schultz",
    avatar:
      "https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 8,
    name: "Mason Heaney",
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 9,
    name: "Claudie Smitham",
    avatar:
      "https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 10,
    name: "Emil Schaefer",
    avatar:
      "https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({
    id: id,
    name: "",
    category: null,
    price: "",
    collection: null,
    materials: [],
    coverImg: "",
    preview: "",
    description: "",
  });
  const [categories, setCategories] = useState(null);
  const [collections, setCollections] = useState(null);
  const [materials, setMaterials] = useState(null);

  const fetchData = async () => {
    const response = await ProductService.getOne(+id);
    const cats = await CategoryService.getAll();
    // const collections = await CollectionService.getAll();
    // const materials = await MaterialService.getAll();

    if (response) {
      response.collection && console.log("Hello");

      setProduct({
        ...product,
        name: response.name,
        category: response.category && response.category.id,
        price: response.price,
        collection: response.collection && response.collection.id,
        materials: response.materials && response.materials,
        coverImg: response.coverImg,
        preview: process.env.NEXT_PUBLIC_API_URL + response.coverImg,
        description: response.description ? response.description : "",
      });
    }

    cats && setCategories(cats);
    // setCollections(collections);
    // setMaterials(materials);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [alertOpened, setAlertOpened] = useState(false);

  const selectFile = (files) => {
    setProduct({ ...product, coverImg: files[0], preview: URL.createObjectURL(files[0]) });
  };

  const updateProduct = async () => {
    const formData = new FormData();

    // formData.append("id", product.id);
    // formData.append("name", product.name);
    // formData.append("categoryId", product.category);
    // formData.append("collectionId", product.collection);
    // formData.append("coverImg", product.id);
    // formData.append("id", product.id);

    formData.append("id", product.id.toString());
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    product.category && formData.append("categoryId", product.category);
    product.collection && formData.append("collectionId", product.collection);
    // product.materials.length > 0 && formData.append("materials", product.materials.toString());
    formData.append("coverImg", product.coverImg);

    await ProductService.update(formData);

    setAlertOpened(true);
  };

  // const checkMaterial = (id) => {
  //   if (materialsIds.some((item) => item == id)) {
  //     setMaterialsIds((prev) => prev.filter((item) => item !== id));
  //   } else {
  //     setMaterialsIds((prev) => [...prev, id]);
  //   }
  // };

  const [selectedCategory, setSelectedCategory] = useState(null);

  console.log(product);

  return (
    <AdminLayout>
      <div className='flex items-center justify-between'>
        <div className='flex gap-5 items-center'>
          <Link
            className='flex items-center gap-1 uppercase place-self-end font-semibold text-zinc-500 hover:text-zinc-900'
            href={ADMIN_URL + "/products"}>
            <ArrowLeftIcon className='h-4 w-4' />
            Назад
          </Link>
          <h2 className='font-semibold text-2xl'>Редактировать товар</h2>
        </div>
      </div>
      <div className='flex gap-x-10 mt-10'>
        <form className='flex gap-12 w-full'>
          <div className='flex flex-col max-w-2xl gap-y-4 w-full'>
            <label className='flex flex-col text-gray-500'>
              Название
              <Input
                value={product.name}
                setValue={(e) => setProduct({ ...product, name: e })}
                type={"text"}
                placeholder={"Наименование"}
              />
            </label>
            <div className='flex items-center justify-between'>
              <label className='flex flex-col text-gray-500 w-full'>
                Цена{" "}
                <div className='w-full'>
                  <Input
                    placeholder={"Введите цену..."}
                    type={"number"}
                    value={product.price}
                    setValue={(e) => setProduct({ ...product, price: e })}
                  />
                  <span className='font-semibold ml-2 text-xl'>₽</span>
                </div>
              </label>
              {/* <label className='flex flex-col text-gray-500 w-full'>
                Скидка{" "}
                <div className='w-full'>
                  <Input
                    placeholder={"Введите скидку..."}
                    type={"number"}
                    value={price}
                    setValue={(e) => setPrice(e)}
                  />
                  <span className='font-semibold ml-2 text-xl'>%</span>
                </div>
              </label> */}
            </div>
            {/* <div className='flex flex-col'>
              <label className='font-semibold' htmlFor='category'>
                Категория
              </label>
              <select
                name='category'
                className='py-2 px-3 outline-none border border-slate-300 rounded-md'
                value={product.category}
                onChange={(e) => setProduct({ ...product, category: e.target.value })}>
                <option value={""}>Не выбрано</option>
                {categories &&
                  categories.map((item) => (
                    <option className='h-6' key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div> */}
            {categories && (
              <Listbox
                value={product.category}
                onChange={(e) => {
                  setProduct({ ...product, category: e.id });
                  setSelectedCategory(e);
                }}>
                {({ open }) => (
                  <>
                    <Listbox.Label className='block text-sm font-medium leading-6 text-gray-900'>
                      Категория
                    </Listbox.Label>
                    <div className='relative mt-2'>
                      <Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6'>
                        <span className='flex items-center'>
                          <span className='ml-3 block truncate'>{product.category}</span>
                        </span>
                        <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                          <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'>
                        <Listbox.Options className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                          {categories.map((category) => (
                            <Listbox.Option
                              key={category.id}
                              className={({ active }) =>
                                classNames(
                                  active ? "bg-indigo-600 text-white" : "text-gray-900",
                                  "relative cursor-default select-none py-2 pl-3 pr-9"
                                )
                              }
                              value={category}>
                              {({ selected, active }) => (
                                <>
                                  <div className='flex items-center'>
                                    <span
                                      className={classNames(
                                        selected ? "font-semibold" : "font-normal",
                                        "ml-3 block truncate"
                                      )}>
                                      {category.name}
                                    </span>
                                  </div>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? "text-white" : "text-indigo-600",
                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                      )}>
                                      <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            )}
            {/* <div className='flex flex-col'>
              <label className='font-semibold' htmlFor='collection'>
                Коллекция
              </label>
              <select
                name='collection'
                className='py-2 px-3 outline-none border border-slate-300 rounded-md'
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
            </div> */}
            {/* {materials && (
              <div>
                <label className='font-semibold'>Доступные материалы</label>
                <ul className='max-h-xl overflow-auto'>
                  {materials.map((item) => (
                    <li className='mb-1' key={item.id}>
                      <label className='text-sm flex gap-2'>
                        <input
                          type='checkbox'
                          name='materials'
                          checked={materialsIds.some((e) => e == item.id)}
                          onChange={() => checkMaterial(item.id)}
                        />
                        <Image
                          src={process.env.NEXT_PUBLIC_API_URL + item.img}
                          width={20}
                          height={20}
                          alt='img'
                        />
                        <b>{item.name}</b>
                        <p>{item.color}</p>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
            {/* <Listbox value={selectedCategory} onChange={setSelectedCategory}>
              {({ open }) => (
                <>
                  <Listbox.Label className='block text-sm font-medium leading-6 text-gray-900'>
                    Категория
                  </Listbox.Label>
                  <div className='relative mt-2'>
                    <Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6'>
                      <span className='flex items-center'>
                        <img
                          src={selectedCategory.avatar}
                          alt=''
                          className='h-5 w-5 flex-shrink-0 rounded-full'
                        />
                        <span className='ml-3 block truncate'>{selectedCategory.name}</span>
                      </span>
                      <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                        <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave='transition ease-in duration-100'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'>
                      <Listbox.Options className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                        {people.map((person) => (
                          <Listbox.Option
                            key={person.id}
                            className={({ active }) =>
                              classNames(
                                active ? "bg-indigo-600 text-white" : "text-gray-900",
                                "relative cursor-default select-none py-2 pl-3 pr-9"
                              )
                            }
                            value={person}>
                            {({ selected, active }) => (
                              <>
                                <div className='flex items-center'>
                                  <img
                                    src={person.avatar}
                                    alt=''
                                    className='h-5 w-5 flex-shrink-0 rounded-full'
                                  />
                                  <span
                                    className={classNames(
                                      selected ? "font-semibold" : "font-normal",
                                      "ml-3 block truncate"
                                    )}>
                                    {person.name}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? "text-white" : "text-indigo-600",
                                      "absolute inset-y-0 right-0 flex items-center pr-4"
                                    )}>
                                    <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox> */}
            <div className='flex flex-col'>
              <label className='font-semibold' htmlFor='desc'>
                Описание
              </label>
              <textarea
                name='desc'
                rows={5}
                placeholder={"Опишите ваш товар..."}
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                className='outline-none py-2 px-3 border rounded-md focus:border-blue-300'
              />
            </div>
          </div>
          <div className='flex h-min relative items-start group '>
            {product.preview && (
              <Image
                src={product.preview}
                width={400}
                height={400}
                alt='product_img'
                className='object-contain w-full'
                priority
              />
            )}

            <div className='absolute transition-all duration-300 inset-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:backdrop-brightness-75 flex justify-center items-center'>
              <label className='font-medium cursor-pointer rounded-md bg-zinc-800 text-white py-2 px-2 flex justify-center items-center'>
                <span>Изменить фото</span>
                <input
                  name='file-upload'
                  type={"file"}
                  onChange={(e) => selectFile(e.target.files)}
                  className='sr-only'
                />
              </label>
            </div>
          </div>
        </form>
      </div>
      <button
        type='button'
        onClick={updateProduct}
        className='bg-zinc-700 hover:bg-zinc-900 transition-colors uppercase duration-300 text-white py-1 px-3 text-sm rounded-md font-semibold'>
        Обновить
      </button>
      <div
        className={`absolute  bottom-10 transition-all duration-300  bg-white p-4 rounded-md  gap-4 border border-green-300 items-center ${
          alertOpened ? "flex" : "hidden"
        }`}>
        <CheckCircleIcon className='h-5 w-5' />
        <p>Обновлено!</p>
      </div>
    </AdminLayout>
  );
};

export default Product;
