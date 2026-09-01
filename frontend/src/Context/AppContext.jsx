import { fetchJob, me } from "@/axios/Axios";
import { refreshtokencall } from "../axios/Axios"
import { useState,createContext, useEffect } from "react";






export const AppContext=createContext();

const AppContextProvider=({children})=>{

    const[login,setLogin]=useState(false);//user login hai ya nhi
          const[jobs,setJobs]=useState([]);
          const[role,setRole]=useState(null);
          const[loading,setLoading]=useState(true);
          const refreshtoken=async()=>{
            try {
              const res=await refreshtokencall();
              console.log("response of refreshtoken",res);
              
            } catch (error) {
              console.log("error in refreshtoken",error);
              

              
            }

          }
      const fetchUser=async()=>{
        try {
          const res=await me();
          console.log("response of checking user logged in or not",res);
          console.log("role in context",res.data.user.role);
          setRole(res.data.user.role);
          
          setLogin(true);
        } catch (error) {
         console.log("user is not logged in",error);
        try {
           await refreshtoken();
           const res=await me();
            setRole(res.data.user.role);
            setLogin(true);
        } catch (refreshError) {
          setLogin(false);
          setRole(null);
        }
        }finally{
          setLoading(false);
        }
      }
      const fetchAllJobs=async()=>{
        try {
          const res=await fetchJob();
          console.log("response of fetching all jobs",res);
          setJobs(res.data.job);
          
        } catch (error) {
          console.log("error in fetching jobs",error);
          
          
        }finally{
          setLoading(false);
        }
    
      }
      useEffect(()=>{
        fetchAllJobs();
        fetchUser();
      },[])
   
    return(
        <AppContext.Provider value={{loading,setLoading,refreshtoken,fetchAllJobs,role,setRole,login,setLogin,jobs,setJobs,fetchUser}}>{children}</AppContext.Provider>
    )

}
export default AppContextProvider;