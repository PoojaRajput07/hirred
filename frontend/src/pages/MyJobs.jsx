import { fetchmyaddedJobs } from '@/axios/Axios';
import JobCard from '@/components/JobCard';
import { AppContext } from '@/Context/AppContext';
import React, { useContext, useEffect, useState } from 'react'

const MyJobs = () => {
  const[myjob,setMyJob]=useState([]);
  const{loading,setLoading}=useContext(AppContext);
  const fetchmyjobs=async()=>{
    
    try {
      setLoading(true);
      const res=await fetchmyaddedJobs();
      console.log("recruiter added jobs response",res);
      setMyJob(res.data.job);
      
    } catch (error) {
      console.log("error in finding recruiter added jobs",error);
      
    }finally{
      setLoading(false);
    }

  }
  useEffect(()=>{
    fetchmyjobs();
  },[])
  return (
    <div className='w-full min-h-screen flex-flex-col items-center '>

      <h1 className='rammetto-one-regular text-center w-full'>My jobs</h1>

     { myjob.length==0?<h1>no job posted by you</h1>:<ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-2'>
      {myjob.map((curElem)=><JobCard curElem={curElem}/>)}
      </ul>}


      
    </div>
  )
}

export default MyJobs
