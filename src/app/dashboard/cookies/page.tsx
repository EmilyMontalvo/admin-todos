import { TabBar } from '@/components';
import React from 'react'


export const metadata = {
  title: 'Cookies Page',
  description: 'Cookies Page',
};

const CookiesPage = () => {
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        <div className='flex flex-col'>
          <span className='text-3xl'>Tabs</span>
          <TabBar/>
        </div>

      </div>
    </>
  )
}

export default CookiesPage
