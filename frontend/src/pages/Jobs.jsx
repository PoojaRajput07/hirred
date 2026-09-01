import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import React, { useContext, useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import JobCard from '@/components/JobCard'
import { Card } from '@/components/ui/card'
import { AppContext } from '@/Context/AppContext'
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { searchFilter } from '@/axios/Axios'

const Jobs = () => {
  const[titleKeyword,setTitleKeyword]=useState("");
  const[location,setLocation]=useState("");
  const[companyKeyword,setCompanyKeyword]=useState("");
const{role}=useContext(AppContext);
  const navigate=useNavigate();
const{jobs,setJobs,fetchAllJobs}=useContext(AppContext);
useEffect(()=>{
  fetchAllJobs();
},[])



const applyFilter=async()=>{
  try {
    const res=await searchFilter(titleKeyword,companyKeyword,location);
    setJobs(res.data.job);

    console.log("response of searcing",res);
    
  } catch (error) {
    console.log("error in searching ",error);
    
  }
  

}
useEffect(()=>{
  applyFilter();
},[titleKeyword,companyKeyword,location])

  return (
    <>
    <div className=' min-h-screen flex flex-col gap-2  items-center mx-2'>
        <h1 className='rammetto-one-regular text-2xl '>LATEST JOBS</h1>

      
          {role=="recruiter"?<div className=' py-2 w-full  border border-gray-600 rounded-sm flex justify-around items-center'>
           <Button variant="outline"onClick={()=>navigate("/MyJobs")}>My Jobs</Button>
          </div>:
          <div className=' py-2 w-full  border border-gray-600 rounded-sm flex justify-around items-center' >
          <Button varaiant="outline" onClick={()=>navigate("/savejobs")}>Wishlist</Button>
          <Button variant="outline"onClick={()=>navigate("/appliedjobs")} >Applied jobs</Button> </div>
          }
          
       
        <div className='w-full flex gap-1 '>
            <Input className="w-full md:w-full rounded-sm"
            onChange={(e)=>setTitleKeyword(e.target.value)}

           value={titleKeyword}
             placeholder="search jobs by title..."
             ></Input>
            <Button type="secondary"className="rounded-sm" onClick={applyFilter}>Search</Button>
        </div>

        <div className='w-full grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr]  gap-1 justify-between'>

          {/* <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Filter by Company" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Company</SelectLabel>
          <SelectItem value="Amazon">Amazon</SelectItem>
          <SelectItem value="Flipkart">Flipkart</SelectItem>
          <SelectItem value="Walmart">Walmar</SelectItem>
          <SelectItem value="Tech Mahindra">Tech Mahindra</SelectItem>
          <SelectItem value="Infoysis">Infoysis</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select> */}
    <Input placeholder="search by company name" 
    type="text"
    onChange={(e)=>{setCompanyKeyword(e.target.value)}}
    value={companyKeyword}>
    </Input>
         
          

           <Select onValueChange={(value)=>setLocation(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Filter by Location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Location</SelectLabel>
          <SelectItem value="Pune">remote</SelectItem>
          <SelectItem value="Pune">Hybrid</SelectItem>
          <SelectItem value="Mumbai">Mumbai</SelectItem>
          <SelectItem value="Hyderabad">Hyderabad</SelectItem>
          <SelectItem value="Gurugram">Gurugram</SelectItem>   
          <SelectItem value="Nodia">Nodia</SelectItem>
          <SelectItem value="Pune">Pune</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
          <Button variant="destructive" className="w-full md:w-auto" onClick={()=>{
            setTitleKeyword("")
            setLocation("")
            setCompanyKeyword("")
            fetchAllJobs()
          }} >Clean Filter</Button>
        </div>


      <div className='w-full min-h-screen '>
        {jobs.length==0?<h1>no job found</h1>:
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 w-full justify-start'>
        {jobs.map((curElem)=>{
          return <li>
            <JobCard curElem={curElem}/>
          </li>

        })}
        </ul>}</div>
      
    </div>
    </>
  )
}

export default Jobs

