import { appliedjobs } from '@/axios/Axios';
import ApplyJobsCard from '@/components/ApplyJobsCard';
import JobCard from '@/components/JobCard';
import { AppContext } from '@/Context/AppContext';

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ApplyJob = () => {
  const navigate=useNavigate();
  const{loading,setLoading}=useContext(AppContext);
  const [appliedjob,setAppliedjob]=useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const fetchappliedjobs=async()=>{
    try {
     
      const res=await appliedjobs();
      console.log("response of applied jobs",res);
      setAppliedjob(res.data.jobApplicationdetail || []);
      
    } catch (error) {
      console.log("error in fetching applied jobs",error);
      const message = error?.response?.data?.message;
if (message?.includes("no token")) {
  navigate("/login");
}
    
  } finally {
    setIsFetching(false);
  }
  }
  useEffect(()=>{
    fetchappliedjobs();
  },[])
  return (

    <div className='w-full min-h-screen'>
      <div className='mb-8 flex flex-col gap-2 border-b border-border pb-6'>
        <p className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>Candidate workspace</p>
        <h1 className='rammetto-one-regular text-2xl'>My applications</h1>
        <p className='text-sm text-muted-foreground'>Track every opportunity from submission to interview.</p>
      </div>
      {isFetching ? <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'><div className='h-52 animate-pulse rounded-xl bg-muted' /><div className='h-52 animate-pulse rounded-xl bg-muted' /><div className='h-52 animate-pulse rounded-xl bg-muted' /></div> : appliedjob.length!=0?<div>
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-2'>
        {appliedjob.map((curElem)=>{return <ApplyJobsCard curElem={curElem}/>})}
        </ul></div>:"no applied jobs"}
        
      
    </div>
  )
}

export default ApplyJob
