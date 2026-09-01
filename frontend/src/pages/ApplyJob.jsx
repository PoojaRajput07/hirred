import { appliedjobs } from '@/axios/Axios';
import ApplyJobsCard from '@/components/ApplyJobsCard';
import JobCard from '@/components/JobCard';
import { AppContext } from '@/Context/AppContext';

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ApplyJob = () => {
  const navigate=useNavigate();
  const{loading,setLoading}=useContext(AppContext);
  const[appliedjob,setAppliedjob]=useState([]);
  const fetchappliedjobs=async()=>{
    try {
     
      const res=await appliedjobs();
      console.log("response of applied jobs",res);
      setAppliedjob(res.data.jobApplicationdetail);
      
    } catch (error) {
      console.log("error in fetching applied jobs",error);
      const message = error?.response?.data?.message;
if (message?.includes("no token")) {
  navigate("/login");
}
    
  }
}
  useEffect(()=>{
    fetchappliedjobs();
  },[])
  return (

    <div className='w-full min-h-screen text-center '>
      <h1 className='rammetto-one-regular my-2 '>APPLIED JOBS</h1>
      {appliedjob.length!=0?<div>
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-2'>
        {appliedjob.map((curElem)=>{return <ApplyJobsCard curElem={curElem}/>})}
        </ul></div>:"no applied jobs"}
        
      
    </div>
  )
}

export default ApplyJob
