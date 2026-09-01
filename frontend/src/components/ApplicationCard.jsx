import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { handleInterview, reject } from "@/axios/Axios";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

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

import { Input } from "./ui/input";
import { toast } from "react-toastify";
import { AppContext } from "@/Context/AppContext";



const ApplicationCard = ({ curElem ,fetchJobDetail}) => {
  const{Loading,setLoading}=useContext(AppContext);
  const[interviewData,setInterviewData]=useState({
    interviewdate:"",
    interviewtime:"",
    mode:"",
    location:"",
    onlinemode:"",//google||meet
    interviewlink:""

   

  })
  const { experience, resume, skills, createdAt ,_id, status} = curElem;
  const[state,setState]=useState(status);
  useEffect(()=>{fetchJobDetail()},[state])
  const handleChange=(e)=>{
    const{name,value}=e.target;
    setInterviewData((prev)=>({
      ...prev,[name]:value
      
    }))

  }
  
const handleReject=async()=>{
  try {
    setLoading(true);
    const res=await reject(_id);
    console.log("response of rejecting th eapplication",res);
    setState("rejected")
   
    
  } catch (error) {
  console.log("FULL ERROR 👉", error.response?.data || error);
}finally{
  setLoading(false);
}

}


const handleShorlist=()=>{

}

const handleSchedule=async()=>{
 try {
  setLoading(true);
   const res=await handleInterview(interviewData,_id);
   console.log("response of scheduling interview",res);
  
  toast.success("interview scheduled!!");
  setState("interview");
 } catch (error) {
  console.log('error in scheduling interview',error);
  
 }finally{
  setLoading(false);
 }
}
  return (
    <div className="  text-white w-full shadow-md rounded-lg p-4 border flex flex-col gap-3">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold ">
          Candidate Application
        </h2>
        <span className="text-sm text-gray-500">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Experience */}
      <p className="">
        <span className="font-medium">Experience:</span> {experience} year(s)
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        <span className="font-medium ">Skills:</span>
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
      {curElem.interviewlink?<div className="flex flex-col mx-2 ">
        <div className="w-15 text-center border-2 text-xs  bg-red-400 border-red-700 rounded-sm">NOTE
          </div>
       <p>interview has been scheduled</p>
        <a className="text-blue-700 z-20 "href={curElem.interviewlink}>interview link</a>
       <p>interview date{new Date(curElem.interviewdate).toLocaleDateString()}</p>
       <p>interview time{curElem.interviewtime}</p>

      </div>:""}

      

      {/* Resume */}
      <a
        href={`http://localhost:5000/${resume}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-center bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
      >
        View Resume
      </a>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <Button variant="destructive" disabled={state=="rejected"||state=="interview"||state=="shortlist"} onClick={handleReject}>REJECT</Button>
        
          <Drawer >
               <DrawerTrigger asChild>
                 <Button variant="secondary"
                 disabled={state=="interview"||state=="rejected"}>scheduled an interview</Button>
               </DrawerTrigger>
               <DrawerContent>
                 <div className="w-full">
                   <DrawerHeader>
                     <DrawerTitle>scheduled an interview {curElem.job.title}</DrawerTitle>
                     <DrawerDescription>Please fill the form Below</DrawerDescription>
                   </DrawerHeader>
                   <div className='flex flex-col gap-2 w-full'>
                   <label htmlFor="time">interview time</label>
                   <Input
                    placeholder="interview time"
                    type="time"
                     className=" w-full text-sm border-sm "
                     name="interviewtime"
                     value={interviewData.interviewtime}
                     onChange={handleChange}></Input>
                      <label htmlFor="date">interview date</label>
                   <Input 
                   type="date"
                   placeholder="interview date"
                    className="text-sm border-sm w-full"
                     name="interviewdate"
                     onChange={handleChange}
                     value={interviewData.interviewdate}
                    
                     >
         
                     </Input>

                     
                    <label htmlFor="location">location</label>
                     <Input type="text"
                     disabled={interviewData.mode=="Online"}
                     placeholder="location"
                     name="location"
                      onChange={handleChange}
                     value={interviewData.location}>
                     </Input>

                     


                     <Select onValueChange={(value)=>setInterviewData((prev)=>({...prev,mode:value}))}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="interview mode" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Mode</SelectLabel>
          <SelectItem value="online">online</SelectItem>
          <SelectItem value="offline">offline</SelectItem>
         
        </SelectGroup>
      </SelectContent>
    </Select>

    {interviewData.mode=="online"?<Select onValueChange={(value)=>setInterviewData((prev)=>({...prev,onlinemode:value}))}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="online mode" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Mode</SelectLabel>
          <SelectItem value="google"> google calender</SelectItem>
          <SelectItem value="zoom"> zoom meeting</SelectItem>
         
        </SelectGroup>
      </SelectContent>
    </Select>:""}
                  </div>
                 <div>
                   
               <div className="flex items-center space-x-2">
                 
                
               </div>
             </div>
                   <DrawerFooter>
                     <Button  onClick={handleSchedule}>Schedule</Button>
                     <DrawerClose asChild>
                       <Button variant="outline">Cancel</Button>
                     </DrawerClose>
                   </DrawerFooter>
                 </div>
               </DrawerContent>
             </Drawer>
          <Button variant="outline"
           disabled={state=="rejected"||state==="shortlist"||state=="interview"}
            className={state=="rejected"?"obacity-50 cursor-not-allowed":""}
           onClick={handleShorlist}>Shortlist</Button>
      </div>
    </div>
  );
};

export default ApplicationCard;
