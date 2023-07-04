import { AuthContext } from "@/pages/_app";
import { ProductService } from "@/services/Product.service";
import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Input from "@/components/UI/input/Input";
import { CategoryService } from "@/services/Category.service";
import { CollectionService } from "@/services/Collection.service";
import {
  ArrowDownLeftIcon,
  ArrowLeftIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  CheckIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { ADMIN_URL } from "@/utils/consts";
import { MaterialService } from "@/services/Material.service";
import TextButton from "@/components/UI/button/TextButton";
import { useRouter } from "next/router";

const Product = ({ product, categories, collections, materials }) => {
  const router = useRouter();

  const [name, setName] = useState(product.name);
  const [categoryId, setCategoryId] = useState(product.categoryId ? product.categoryId : "");
  const [price, setPrice] = useState(product.price);
  const [collectionId, setCollectionId] = useState(
    product.collectionId ? product.collectionId : ""
  );
  const [coverImg, setCoverImg] = useState(null);
  const [id, setId] = useState(product.id);
  const [preview, setPreview] = useState(process.env.NEXT_PUBLIC_API_URL + product.coverImg);
  const [description, setDescription] = useState(product.description ? product.description : "");
  const [materialsIds, setMaterialsIds] = useState(product.materials ? product.materials : []);

  const [alertOpened, setAlertOpened] = useState(false);

  const selectFile = (files) => {
    setCoverImg(files[0]);
    setPreview(URL.createObjectURL(files[0]));
  };

  const updateProduct = async () => {
    const formData = new FormData();

    formData.append("id", id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    categoryId && formData.append("categoryId", categoryId ? categoryId : 0);
    collectionId && formData.append("collectionId", collectionId ? collectionId : 0);
    materialsIds.length > 0 &&
      formData.append("materials", materialsIds.length > 0 ? materialsIds : []);
    formData.append("coverImg", coverImg);

    const updated = await ProductService.update(formData);

    console.log(updated);

    setAlertOpened(true);
  };

  useEffect(() => {
    setId(product.id);
    setName(product.name);
    setCategoryId(product.categoryId ? product.categoryId : "");
    setPrice(product.price);
    setCollectionId(product.collectionId ? product.collectionId : "");
    setDescription(product.description ? product.description : "");
    setMaterialsIds(product.materials ? product.materials : []);
  }, [product]);

  console.log(materialsIds);

  const checkMaterial = (id) => {
    if (materialsIds.some((item) => item == id)) {
      setMaterialsIds((prev) => prev.filter((item) => item !== id));
    } else {
      setMaterialsIds((prev) => [...prev, id]);
    }
  };

  return (
    <AdminLayout>
      <div className='flex items-center justify-between'>
        <div className='flex gap-5'>
          <TextButton variant={"black"} clickHandler={() => router.push(ADMIN_URL + "/products")}>
            <ArrowLeftIcon className='h-4 w-4' />
            Назад
          </TextButton>
          <h2 className='font-semibold text-2xl'>Редактировать товар</h2>
        </div>
        <button
          type='button'
          onClick={updateProduct}
          className='bg-zinc-700 hover:bg-zinc-900 transition-colors uppercase duration-300 text-white py-1 px-3 text-sm rounded-md font-semibold'>
          Обновить
        </button>
      </div>
      <div className='flex gap-x-10 mt-10'>
        <form className='flex gap-12 w-full'>
          <div className='flex h-min relative items-start group '>
            <Image
              src={preview}
              width={400}
              height={400}
              alt='product_img'
              className='object-contain w-full'
              priority
            />

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
          <div className='flex flex-col max-w-2xl gap-y-4 w-full'>
            <input
              name={"name"}
              placeholder={"Наименование"}
              type={"text"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='outline-none bg-transparent border-b border-black text-xl pb-1 font-semibold'
            />
            <div className='flex items-center justify-between'>
              <label className='font-semibold' htmlFor='price'>
                Цена
              </label>
              <div className='text-xl pb-1 font-semibold'>
                <input
                  name='price'
                  placeholder={"Введите цену..."}
                  type={"number"}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className='outline-none w-32 bg-transparent border-b border-black'
                />
                ₽
              </div>
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold' htmlFor='category'>
                Категория
              </label>
              <select
                name='category'
                className='py-2 px-3 outline-none border border-slate-300 rounded-md'
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}>
                <option value={""}>Не выбрано</option>
                {categories.map((item) => (
                  <option className='h-6' key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex flex-col'>
              <label className='font-semibold' htmlFor='collection'>
                Коллекция
              </label>
              <select
                name='collection'
                className='py-2 px-3 outline-none border border-slate-300 rounded-md'
                value={collectionId}
                onChange={(e) => setCollectionId(e.target.value)}>
                <option value={""}>Не выбрано</option>
                {collections.map((item) => (
                  <option className='h-6' key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
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
            <div className='flex flex-col'>
              <label className='font-semibold' htmlFor='desc'>
                Описание
              </label>
              <textarea
                name='desc'
                rows='5'
                placeholder={"Опишите ваш товар..."}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='outline-none py-2 px-3 border rounded-md focus:border-blue-300'
              />
            </div>
          </div>
        </form>
      </div>

      <div
        className={`absolute bottom-10 transition-all duration-300  bg-white p-4 rounded-md flex gap-4 border border-green-300 items-center ${
          alertOpened ? "right-10" : "-right-full"
        }`}>
        <CheckCircleIcon className='h-5 w-5' />
        <p>Обновлено!</p>
      </div>
    </AdminLayout>
  );
};

export default Product;

export const getStaticPaths = async () => {
  const products = await ProductService.getAll();

  const paths = products.rows.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const product = await ProductService.getOne(params.id);
  const categories = await CategoryService.getAll();
  const collections = await CollectionService.getAll();
  const materials = await MaterialService.getAll();

  if (!product) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      product: product,
      categories: categories,
      collections: collections,
      materials: materials,
    },
  };
};
