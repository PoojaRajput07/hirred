import { addnewPassword, checkOtp, sentMail } from '@/axios/Axios';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AppContext } from '@/Context/AppContext';
import React, { useContext, useState } from 'react'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ChangePassword = () => {
    const[email,setEmail]=useState("");
    const[otp,setOtp]=useState();
    const[checkedOtp,setCheckedOtp]=useState("");
    const{loading,setLoading}=useContext(AppContext);
    const[sent,setSent]=useState(false);
    const navigate=useNavigate();
        const[newPassword,setNewPassword]=useState("");
    const handlenewPassword=async()=>{
       try {
        setLoading(true);
         const res=await checkOtp(email,otp);
         console.log("response of checking otp",res);
         setCheckedOtp(true);
         
        

        
       } catch (error) {
        console.log("error in checking otp",error);
        const errorMessage = error.response?.data?.message || "Invalid OTP. Please try again.";
        toast.error(errorMessage);
       }finally{
        setLoading(false);

       }

    }
        const handlesentEmail=async()=>{
        try {
            setLoading(true);
            console.log("email",email);
            const res=await sentMail(email);
            console.log("response of sending email",res);
            setSent(true);
            toast.success("OTP sent to your email")
            
        } catch (error) {
            console.log("error in sending email",error);
            const errorMessage = error.response?.data?.message || "Failed to send OTP. Please check your email and try again.";
            toast.error(errorMessage);
            
        }finally{
            setLoading(false);
        }

    }

     const handlechangingPassword=async()=>{
  try {
    setLoading(true);
  const res=await addnewPassword(newPassword,email,otp);
    console.log("response of setting new password",res); 
    toast.success("password is updated");
    navigate("/login");
    
  } catch (error) {
    console.log("error in setting new password",error);
    const errorMessage = error.response?.data?.message || "An error occurred while changing password";
    toast.error(errorMessage);
    
  }finally{
    setLoading(false);
  }

}
  return (
    <>
    {!checkedOtp?
    <div className='mx-3 flex min-h-screen items-center justify-center flex-col gap-4'>
        <h1>Reset Password</h1>
       <p>Drop your email below and we'll send you OTP to verify email</p>
      <Input placeholder="enter you email" name="email" onChange={(e)=>setEmail(e.target.value)} className="w-full"
       type="email" required 
        ></Input>
        {sent?<> <InputOTP value={otp}
  onChange={(value) => setOtp(value)} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
    <Button variant='secondary' className="w-full" onClick={handlenewPassword}>continue</Button></>:""}
      <Button variant="destructive" className="w-full" onClick={handlesentEmail}>{sent?"resend email":"Sent OTP"}</Button>
    </div>
:  <div className='min-h-screen  mx-2 flex items-center justify-center flex-col gap-2'>
        
        <label htmlFor="newPassword">New Password</label>
        <Input placeholder="enter new password" type="password"
        onChange={(e)=>setNewPassword(e.target.value)}
        required name="password"></Input>
        <Button variant="secondary" onClick={handlechangingPassword}>confirm password</Button>
      
    </div>}
   
    </>
  )
}

export default ChangePassword
