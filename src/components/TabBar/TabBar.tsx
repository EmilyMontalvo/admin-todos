'use client'

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";


const tabOptions = [1, 2, 3, 4, 5]

interface Props {
  currentTab?: number,
  tabOptions?: number[]
}


export const TabBar = ({ currentTab = 1, tabOptions = [1, 2, 3, 4] }: Props) => {

  const [selected, setSelected] = useState(currentTab);
  const router = useRouter();

  const onTabSelected = (tab: number) => {
    setSelected(tab)
    setCookie('selectedTab',tab.toString()) //! Solo usar del lado del cliente
                                            // Añado una cookie con el nombre selectedTab y su valor (tiene que ser string)
    router.refresh()
  }

  return (
    <div className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2 ${'grid-cols-' + tabOptions.length}`}>
      {/*Para hacer lo del ${'grid-cols-'+ tabOptions.length} hay que agregar la configuración al tailwind.config.ts, si no no vale  */}

      {tabOptions.map(tab => (
        <div key={tab}>
          <input
            checked={selected === tab}
            onChange={() => { }}  //! Solo lo defino para buenas prácticas de React, que no me de error
            type="radio"
            id={tab.toString()}
            className="peer hidden" />
          <label
            onClick={() => onTabSelected(tab)}
            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
            {tab}
          </label>
        </div>
      ))
      }
    </div>

  )
}