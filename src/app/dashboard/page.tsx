import {WidgetItem} from '@/components/widgets/WidgetItem'
import React from 'react'

const DashboardPage = () => {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WidgetItem/>
        <WidgetItem/>
        <WidgetItem/>
      </div>
    </>
  )
}

export default DashboardPage
