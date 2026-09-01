import { applyJob, postdetail, refreshtokencall, updatejob, viewjob } from '@/axios/Axios';
import { Button } from '@/components/ui/button';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaLocationDot } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { GrStatusGoodSmall } from "react-icons/gr";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import { AppContext } from '@/Context/AppContext';
import ApplicationCard from '@/components/ApplicationCard';




const JobDetail = () => {
  const{fetchUser,role,loading,setLoading,refreshtoken}=useContext(AppContext);
console.log("role",role);
  const navigate=useNavigate();
  const{id}=useParams();
  console.log("id",id);
   const[applyData,setApplyData]=useState({
    experience:"",
    skills:"",
    id:id,
    resume:null,

  })
  const[data,setData]=useState({
    title:"",
    description:"",
    location:"",
    noOfApplicants:0,
    skills:[],
    salary:"",
    status:"",
  })
  const[jobApplication,setJobApplication]=useState([]);
  const[submitbutton,setSubmitbutton]=useState(false);
  useEffect(()=>{
    fetchUser();
  },[])
  const fetchJobDetail=async()=>{
    try {
     setLoading(true);
 console.log("JobDetail component rendered");
      const res= await viewjob(id);
      console.log("response of fetching job detail",res);
      if(res.data?.jobApplicationdetail){
        setJobApplication(res.data.jobApplicationdetail);

      }

      if(res.data.message=="already applied to job"){
        toast.error("APPLIED!!");
        setSubmitbutton(true);
      }
     setData(
      {
        status:res.data.job.status,
        title:res.data.job.title,
    description:res.data.job.description,
    location:res.data.job.location,
    noOfApplicants:res.data.job.noOfApplicants,
    
    skills:res.data.job.skillsRequired,
    salary:res.data.job.salary
}
     ) 
    } catch (error) {
      console.log("error in fetching job detail",error);
      const errorMessage = error.response?.data?.message || "An error occurred while fetching job details";
      
      if(errorMessage === "invalid or expired token" || errorMessage === "invalid or expired token"){
        try {
          await refreshtoken();
          fetchJobDetail(); // Retry after refresh
        } catch (refreshError) {
          toast.error("Session expired. Please login again");
          window.location.href="/login";
          return;
        }
      }
      else if(errorMessage === "user has no token,do login"){
        toast.error("Please login to view job details");
        navigate("/login", { replace: true });
        return;
      }
      else if(errorMessage === "something went wrong in checing  candidate in middleware"){
        navigate("/role", { replace: true });
        return;
      }
      else {
        toast.error(errorMessage);
      }
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchJobDetail();
  },[])
 
  const handleChange=(e)=>{
   const{name,value}=e.target;
   setApplyData((prev)=>({
    ...prev,[name]:value
   }))

  }
 
  const handleSubmit=async()=>{
     const formData=new FormData();
  formData.append("experience",applyData.experience),
  formData.append("skills",applyData.skills),
  formData.append("id",applyData.id);
 
  formData.append("resume",applyData.resume);
    try {
      setLoading(true);
      const res=await applyJob(formData);
      console.log('response of applying the job',res);
      setSubmitbutton(true);
      toast.success("applied !!");
      
      
    } catch (error) {
      console.log("error in applying job",error);
      const errorMessage = error.response?.data?.message || "An error occurred while applying for the job";
      toast.error(errorMessage);
    }finally{
      setLoading(false);
    }

  }
  const handleStatusChange=async(e)=>{
    try {
      setData((prev)=>({
        ...prev,status:e.target.value
      }))


      const res=await updatejob(id,e.target.value);
      console.log("response of updating status",res);
      
      
    } catch (error) {
      console.log("error in changing  the status of the job",error);
      const errorMessage = error.response?.data?.message || "An error occurred while updating job status";
      toast.error(errorMessage);
    }
  }
  
  return (
    <div className='mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 py-2'>
         <div className='rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8'>
         <h1 className='  rammetto-one-regular w-full text-left text-2xl '>{data.title}</h1>
         <div className=' w-full grid grid-cols-3 gap-1 text-sm  justify-center bg-white/20 backdrop-blur-lg border border-white/30 rounded-sm shadow-lg'>
          <p className='flex items-center gap-1'><FaLocationDot />{data.location}</p>
          <p  className='flex items-center'>
            <IoPeopleSharp />
            <p>{data.noOfApplicants} Applicants</p></p>
         <p className="flex items-center gap-1">
  <GrStatusGoodSmall size={5}
    className={
      data.status === "Hiring" ? "text-green-500" : "text-red-500"
    }
  />

  {/* Candidate → only view */}
  {role === "candidate" && (
    <span className="font-medium">{data.status}</span>
  )}

  {/* Recruiter → edit */}
  {role === "recruiter" && (
    <select
      value={data.status}
      onChange={handleStatusChange}
      className="border rounded  py-1"
    >
      <option value="Hiring">Hiring</option>
      <option value="Closed">closed</option>
    </select>
  )}
</p>

         </div>
         <h1 className='rammetto-one-regular w-full text-left text-lg '>About the job </h1>
         <p className='w-full text-left'>{data.description}</p>

         <h1 className='  rammetto-one-regular w-full text-left text-lg '>what we are looking for</h1>
          <ul className='w-full items-left px-2'>
            {
              data.skills.map((curElem,index)=>(
              <li key={index}>{curElem}</li>))
              }
          </ul>
          {role === 'recruiter' && <Button variant='outline' onClick={() => navigate(`/postajob?edit=${id}`)}>Edit listing</Button>}
          {
            role=="candidate"?  <Drawer >
      <DrawerTrigger asChild>
        <Button variant="outline"
        disabled={submitbutton}>{submitbutton?"APPLIED":"APPLY"}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full">
          <DrawerHeader>
            <DrawerTitle>{`apply for ${data.title}`}</DrawerTitle>
            <DrawerDescription>Please fill the form Below</DrawerDescription>
          </DrawerHeader>
          <div className='flex flex-col gap-2 w-full'>
          <Input
           placeholder="Years Of Experience"
           type="text"
            className=" w-full text-sm border-sm "
            name="experience"
            value={applyData.experience}
            onChange={handleChange}

            ></Input>
          <Input 
          type="text"
          placeholder="skills(comma seprated)"
           className="text-sm border-sm w-full"
            name="skills"
            value={applyData.skills}
            onChange={handleChange}>

            </Input>
         <Input placeholder="choose file- no file choosen" 

         className="text-sm"
       type="file"
       accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
       onChange={(e)=>setApplyData(prev=>({
       ...prev,resume:e.target.files[0]}))}
       required></Input>
         </div>
        <div>
          
      <div className="flex items-center space-x-2">
        
       
      </div>
    </div>
          <DrawerFooter>
            <Button onClick={handleSubmit}
           disabled={submitbutton}
            className={submitbutton?"btn-disable":""}>{submitbutton?"APPLIED":"APPLY"}</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>:<ul className=" w-full grid grid-cols-1  gap-4">
  {jobApplication.map((application) => (
    <ApplicationCard key={application._id} curElem={application} fetchJobDetail={fetchJobDetail} />
  ))}
</ul>

          }

        
       
      
      
      
         </div>
    </div>
  )
}

export default JobDetail
