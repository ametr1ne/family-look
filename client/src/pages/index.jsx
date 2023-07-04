import CategoriesPreview from "@/components/home/Categories";
import Hero from "@/components/home/Hero";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>FAMILY LOOK</title>
        <meta
          name='description'
          content='Семейный онлайн-магазин для приобретения одежды под заказ.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Hero />
        <CategoriesPreview />
      </main>
    </>
  );
}
