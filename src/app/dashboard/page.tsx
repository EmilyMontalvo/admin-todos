import { auth } from '@/auth';
import {WidgetItem} from '@/components/widgets/WidgetItem'
import { redirect } from 'next/navigation';
import React from 'react'

export const metadata = {
 title: 'Dashboard',
 description: 'Dashboard',
};



const DashboardPage = async () => {


  const session = await auth()

  if(!session){
    redirect('/api/auth/signin');
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 grid-cols-1">
        <WidgetItem title='Usuario conectado ServerSide'>
        <div className='flex flex-col'>
          <span>{session.user?.name}</span>
          <span>{session.user?.image}</span>
          <span>{session.user?.email}</span>
          <div>

          {JSON.stringify(session)}

          </div>
        </div>
        </WidgetItem>
         
      </div>
    </>
  )
}

export default DashboardPage
