import React from 'react'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'

const AppStarter = () => {
  return (
    <div className='w-full h-screen flex bg-slate-100'>
        <div className='w-[20%] h-fit'>
            <SideBar />
        </div>

        <div className='w-[80%] h-full overflow-y-auto'>
            <Outlet />
        </div>
    </div>
  )
}

export default AppStarter