import React, { useContext, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from './ui/button';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { addWishlist, removeWishlist } from '@/axios/Axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '@/Context/AppContext';

const JobCard = ({ curElem }) => {
  const { role } = useContext(AppContext);
  const [wishlist, setWishlist] = useState(false);
  const { title, description, salary, location, company, _id } = curElem;
  const navigate = useNavigate();
  const handleWishlist = async () => {
    try {
      const nextState = !wishlist; setWishlist(nextState);
      if (nextState) { await addWishlist(_id); toast.success('Job saved'); }
      else { await removeWishlist(_id); toast.success('Job removed'); }
    } catch (error) { setWishlist(wishlist); const message = error.response?.data?.message || 'Unable to update saved jobs'; if (message === 'user has no token,do login') navigate('/login'); else toast.error(message); }
  };
  return <Card className='flex h-full flex-col gap-4 bg-none p-5 text-sm'>
    <div className='flex items-start justify-between gap-3'><div><h2 className='text-lg font-bold'>{title}</h2><p className='mt-1 text-gray-300'>{company}</p></div>{role !== 'recruiter' && <button type='button' aria-label={wishlist ? 'Remove from saved jobs' : 'Save job'} onClick={handleWishlist} className='rounded-md p-2 text-xl hover:bg-gray-800'>{wishlist ? <IoHeart className='text-red-500' /> : <IoHeartOutline />}</button>}</div>
    <div className='flex flex-wrap gap-x-4 gap-y-1 text-gray-400'><span>{location}</span>{salary && <span>{salary}</span>}</div>
    <p className='line-clamp-3 flex-1 leading-6 text-gray-300'>{description}</p>
    <Button variant='secondary' className='w-full' onClick={() => navigate(`/jobdetail/${_id}`)}>View details</Button>
  </Card>
}
export default JobCard
