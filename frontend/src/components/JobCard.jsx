import React, { useContext, useState } from 'react'
import {Card} from "@/components/ui/card"
import { Button } from './ui/button';
import { IoHeart } from "react-icons/io5";
import { addWishlist, removeWishlist } from '@/axios/Axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '@/Context/AppContext';
const JobCard = ({curElem}) => {
    const{role}=useContext(AppContext);
    const[wishlist,setWishList]=useState(false);
    const{title,description,salary,location,company,_id}=curElem;
        const navigate=useNavigate();
    const handleWishList=async(id)=>{
            try {
                const currentState=!wishlist;
                setWishList(!wishlist);
                if(currentState==true){
                    const res=await addWishlist(id);
                    console.log("response of adding job to the wishlist",res);
                    toast.success("job added to wishlist"); 
                }
                if(currentState==false){
                    const res=await removeWishlist(id);
                    console.log("response of removing job from the wishlist",res);
                    toast.success("job removed from wishlist"); 
                }
            } catch (error) {
                console.log("error in wishlisting the job",error);
                const errorMessage = error.response?.data?.message || "An error occurred while updating wishlist";
                if(errorMessage=="user has no token,do login"){
                    navigate("/login");
                }
                else{
                toast.error(errorMessage)
                }
                
            }  
           
        }

    
  return (
   
    <Card className="w-full h-full bg-none p-4 text-sm ">
        <h1 className='text-lg font-bold'>{title}</h1>
        <div className='flex justify-evenly w-full text-sm'>
           <p className='w-1/2'>{company}</p>

           <p className='w-full text-end'> {location}</p>
        </div>
        <hr  className=' bg-gray-900 w-full'/>
        <p>{description}</p>
        <div className={`grid gap-2 w-full ${role=="recruiter"?"grid-cols-1": "grid-cols-[7fr_1fr]"} `}>
            <Button variant="secondary" className="w-full"
            onClick={()=>navigate(`/jobdetail/${_id}`)}>More Details</Button>
            {role=="recruiter"?"":<div className='flex items-center justify-center '>
                <IoHeart  size={20} 
                 onClick={()=>handleWishList(_id)}
            className={wishlist==true?"text-red-500":""}
           />
            </div>
            }
            
        
        </div>
            
        
  
</Card>

  )
}


export default JobCard
