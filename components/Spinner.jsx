import Image from 'next/image';
import React from 'react';
import spinner from '../public/spinner.gif';

const Spinner = () => {
  return (
    <div className='flex justify-center items-center min-h-screen bg-black/40'>
      <Image className='w-[200px] h-[200px] m-auto block' src={spinner} alt='loading..' />
    </div>
  );
};

export default Spinner;
