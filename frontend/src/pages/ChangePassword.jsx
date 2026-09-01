import { addnewPassword, checkOtp, sentMail } from '@/axios/Axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AppContext } from '@/Context/AppContext';
import React, { useContext, useState } from 'react';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [checkedOtp, setCheckedOtp] = useState(false);
  const [sent, setSent] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const { loading, setLoading } = useContext(AppContext);
  const navigate = useNavigate();
  const run = async (action, success) => { try { setLoading(true); await action(); success?.(); } catch (error) { toast.error(error.response?.data?.message || 'Something went wrong. Please try again.'); } finally { setLoading(false); } };
  const sendEmail = () => run(() => sentMail(email), () => { setSent(true); toast.success('Verification code sent'); });
  const verifyOtp = () => run(() => checkOtp(email, otp), () => setCheckedOtp(true));
  const reset = () => run(() => addnewPassword(newPassword, email, otp), () => { toast.success('Password updated'); navigate('/login'); });
  return <main className='flex min-h-screen items-center justify-center px-4 py-10'>
    <section className='w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8'>
      <div className='mb-8 flex flex-col gap-2'><p className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>Account recovery</p><h1 className='text-2xl font-semibold'>Reset your password</h1><p className='text-sm leading-6 text-muted-foreground'>Secure your account with a one-time verification code.</p></div>
      {!checkedOtp ? <div className='flex flex-col gap-5'>
        <label className='flex flex-col gap-2 text-sm font-medium'>Email address<Input type='email' placeholder='you@example.com' value={email} onChange={e => setEmail(e.target.value)} required /></label>
        {!sent ? <Button onClick={sendEmail} disabled={loading || !email}>{loading ? 'Sending…' : 'Send verification code'}</Button> : <><div className='flex flex-col gap-2 text-sm font-medium'><span>Verification code</span><InputOTP value={otp} onChange={setOtp} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}><InputOTPGroup>{[0,1,2,3,4,5].map(index => <InputOTPSlot key={index} index={index} />)}</InputOTPGroup></InputOTP></div><div className='flex gap-3'><Button className='flex-1' onClick={verifyOtp} disabled={loading || otp.length < 6}>Verify code</Button><Button variant='outline' onClick={sendEmail} disabled={loading}>Resend</Button></div></>}
      </div> : <div className='flex flex-col gap-5'><label className='flex flex-col gap-2 text-sm font-medium'>New password<Input type='password' placeholder='At least 6 characters' minLength={6} value={newPassword} onChange={e => setNewPassword(e.target.value)} required /></label><Button onClick={reset} disabled={loading || newPassword.length < 6}>{loading ? 'Updating…' : 'Update password'}</Button></div>}
      <Button variant='link' className='mt-4 w-full' onClick={() => navigate('/login')}>Back to sign in</Button>
    </section>
  </main>;
};
export default ChangePassword;
