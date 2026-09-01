import Login from '@/components/Login';
import { Button } from '@/components/ui/button'
import { Carousel } from '@/components/ui/carousel'
import { AppContext } from '@/Context/AppContext';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate=useNavigate()

  return (
    <>
  
    <div className='flex flex-col gap-8 relative justify-center items-center mt-20 mx-10   '>
   
      <section className='w-full  mt-3 text-center px-8'>
        <h1 className=" rammetto-one-regular text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl  h-full w-full text-center leading-normal ">
           Find your Dream Job and     
          <span className='ml-2 inline-flex  justify-center items-center '> get  <img src="/logo.png" className='w-24 sm:w-26 md:w-30 lg:w-70 xl:w-60'/></span>
        </h1>
      </section>
      <p className='font-semibold text-sm xl:text-lg text-center text-gray-300'>Explore thousands of job listings or find the perfect candidate</p>
      <div className='flex gap-4 justify-center'>
       <Button variant='secondary' className=" xl:px-xl xl:py-xl xl:text-xl xl:h-20 xl:w-45" onClick={()=>navigate("/jobs")}>Find Job</Button>
       <Button variant='destructive' className="xl:px-xl xl:py-xl xl:text-xl xl:h-20 xl:w-45" onClick={()=>navigate("/postajob")}>Post Job</Button>
      </div>

      <Carousel/>
      <img src="/banner.jpeg"/>
      <div className='flex-col w-full gap-4'>
        <div className=' p-4 w-full rounded bg-[#01172f]  border-1 border-gray-700  h-20  flex flex-col justify-center '>
         <h1 className='font-bold '>For Job Seekers</h1> 
         <p>Search and apply for jobs, track applications, and more.</p>
        </div>
         <div className='p-4 w-full rounded bg-[#01172f] border-1 border-gray-700 h-20  flex flex-col justify-center   '>
         <h1>For Job Seekers</h1> 
         <p>Search and apply for jobs, track applications, and more.</p>
        </div>
      </div>
    </div>
    </>
   
  )
}

export default LandingPage
