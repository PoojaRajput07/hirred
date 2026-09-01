import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router'

const AppLayout = () => {
  return <div className='min-h-screen'>
    <div className='grid-background' aria-hidden='true'></div>
    <main className='relative mx-auto min-h-[calc(100vh-7rem)] w-full max-w-6xl px-4 sm:px-8'>
      <Header />
      <div className='py-8 sm:py-12'><Outlet /></div>
    </main>
    <footer className='border-t border-gray-700 bg-gray-800/80 px-4 py-8 text-center text-sm text-gray-400'>Made with care by Pooja</footer>
  </div>
}

export default AppLayout
