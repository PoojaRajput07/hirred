import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useContext, useState } from 'react'

import { Textarea } from "@/components/ui/textarea"
import { addJob } from '@/axios/Axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppContext } from '@/Context/AppContext'


const PostJob = () => {
  const{loading}=useContext(AppContext);
    const navigate=useNavigate();
    const[error,setError]=useState("");
    const[postdata,setPostData]=useState({
        title:"",
        description:"",
        location:"",
        companyName:"",
        skills:"",
        salary:"",

    })
    
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setPostData((prev)=>({
            ...prev,[name]:value

        }))

    }
    const handleSubmit=async()=>{
        try {
            const res=await addJob(postdata);
            console.log("response of adding job",res);
            toast.success("job added!!");
            navigate("/jobs")
            
        } catch (error) {
            console.log("error in posting a job",error);
            const errorMessage = error.response?.data?.message || "An error occurred while posting the job";
            if(errorMessage=="user has no token,do login"){
              navigate("/login")
            }
            else if(errorMessage=="you are not recruiter in middleware"){
              setError("signup with another account as candidate")
            }
            else {
              toast.error(errorMessage);
            }
        }

    }
  return (
    <>
   
    <div className=' min-h-screen  flex flex-col  mx-2'>

        <h1 className='rammetto-one-regular lg:text-xl text-center text-3xl my-8'>Post A job</h1>
        {error? <div className='mx-2 bg-red-600 text-white z-20 text-center my-3 py-3 rounded-sm'><h1>{error}</h1></div>:""}
        <div className='flex flex-col gap-2 '>
            <Input placeholder="Job Title"
            name="title"
            className="w-full"
            type="text"
            onChange={handleChange}
            value={postdata.title}
            required="true"></Input>

            <Input placeholder="Job description"
             name="description"
            className="w-full"
            type="text"
            onChange={handleChange}
            value={postdata.description}
            required="true"></Input>

            <div className='grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-2'>
                <Select value={postdata.location} 
                onValueChange={(value)=>{setPostData((prev)=>({...prev,location:value}))}}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Job Location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Job Location</SelectLabel>
          <SelectItem value="Remote">Remote</SelectItem>
          <SelectItem value="Mumbai">Mumbai</SelectItem>
          <SelectItem value="Gurugram">Gurugram</SelectItem>
          <SelectItem value="Nodia">Nodia</SelectItem>
          <SelectItem value="Pune">Pune</SelectItem>
          <SelectItem value="Hyderabad">Hyderabad</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
     <Input placeholder="Company Name"
     name="companyName"
            className="w-full"
            type="text"
            onChange={handleChange}
            value={postdata.companyName}
            required></Input>
        </div>
{/* title,description,skillsRequired,location,status,salary,noOfApplicants */}
        <Textarea placeholder="Skills Required" 
        onChange={handleChange}
         name="skills"
          value={postdata.skills}
           required/>
          {/* <Select value={postdata.hiring}  onValueChange={(value)=>{setPostData((prev)=>({...prev,status:value}))}}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>status</SelectLabel>
          <SelectItem value="Hiring">Hiring</SelectItem>
          <SelectItem value="closed">closed</SelectItem>
         
        </SelectGroup>
      </SelectContent>
    </Select> */}


    <Input type="Number"
     name="salary"
      onChange={handleChange}
       value={postdata.salary}
        required 
    placeholder=" Salary"></Input>

        <Button variant="secondary" onClick={handleSubmit}>{loading?"posting...":"Submit"}</Button>

        </div>
      
    </div>
    </>
  )
}

export default PostJob
