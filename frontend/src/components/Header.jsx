import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { Button } from './ui/button'
import { AppContext } from '@/Context/AppContext';
import { logout } from '@/axios/Axios';
import { toast } from 'react-toastify';


const Header = () => {
    const navigate=useNavigate();
    const{login,setLogin}=useContext(AppContext);
    const handleLogout=async()=>{
        try {
            const res=await logout();
            console.log("response of logout the user",res);
            toast.success("logout");
            setLogin(false);
            navigate("/");
            
        } catch (error) {
            console.log("error in loggout the user ",error);
            if(error.response.message=="user has no token,do login"){
                navigate("/login");
            }
            
        }
    }
   
 return (
    <>
  
    <div>
        <nav className='py-4 flex items-center mx-8 justify-between'>
            <Link to="/">
            <img src="/logo.png" className='h-10 md:h-20'/>
            </Link>

           <Button variant="outline" onClick={()=>{login?handleLogout():navigate("/login")}} >{login?"Logout":"Login"}</Button>
        </nav>
    </div>

    </>
 )
}

export default Header
