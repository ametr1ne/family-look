import { MaterialService } from "@/services/Material.service";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MaterialItem = ({ material, setMaterial, activeMaterial }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchMaterial = async () => {
      const res = await MaterialService.getOne(material);
      setData(res);
    };

    fetchMaterial();
  }, []);

  return (
    data && (
      <li
        className={`border rounded-xl p-1 pr-2 cursor-pointer ${
          activeMaterial == material ? "border-zinc-800 " : "border-zinc-300 "
        }`}>
        <label className='flex gap-3 items-center'>
          <Image
            src={process.env.NEXT_PUBLIC_API_URL + data.img}
            width={50}
            height={50}
            className='h-12 w-12 object-cover rounded-md'
            alt='material'
          />
          <div className='flex flex-col'>
            <span className='text-xs font-medium'>{data.name}</span>
            <span className='text-xs'>{data.color}</span>
          </div>
          <input className='sr-only' type='radio' checked={material} onChange={setMaterial} />
        </label>
      </li>
    )
  );
};

export default MaterialItem;
