import Header from '@/components/Header'
import AppContextProvider from '@/Context/AppContext'
import React from 'react'
import { Outlet } from 'react-router'

const AppLayout = () => {
  return (
    <div>
        <div className='grid-background'></div>
        <main className='min-h-screen container  max-w-6xl mx-auto '>
          <Header/>
         
           <Outlet/>
           
          
        </main>
         <div className='p-10 text-center bg-gray-800 mt-10'> Made with 💗 by Pooja</div>
       
    </div>
  )
}

export default AppLayout
