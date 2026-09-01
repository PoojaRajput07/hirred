import { madeCandidate, madeRecruiter } from '@/axios/Axios';
import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Role = () => {
    const navigate=useNavigate();
    const handleRole=async(role)=>{
        try{
            if(role=="candidate"){
            const res=await madeCandidate();
            console.log("response of making candidate",res);
             toast.success("you are a candidate now");
             navigate('/jobs');
            }
            else{
                const res=await madeRecruiter();
              console.log("response of making recruiter",res);
              toast.success("you are a recruiter now");
              navigate('/jobs');

            }
            
           
          

        }catch(error){
            console.log("error in making role",error);
            const errorMessage = error.response?.data?.message || "An error occurred while setting role";
            toast.error(errorMessage);

        }

    }

  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center gap-8 ' >
        <h1 className='rammetto-one-regular text-xl'>i am a...</h1>
        <div className='w-full flex flex-wrap justify-center items-center gap-2'>
            <Button variant="secondary" className="md:w-65 md:h-30 md:text-xl" onClick={()=>handleRole("candidate")}>candidate</Button>
            <Button variant="destructive" className="md:w-65 md:h-30 md:text-xl"onClick={()=>handleRole("recruiter")}>Recruiter</Button>

        </div>

      
    </div>
  )
}

export default Role
