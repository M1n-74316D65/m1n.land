'use client';
import { SlidingNumber } from 'app/components/ui/sliding-number';
import { useEffect, useState } from 'react';

export function Clock() {
  const [hours, setHours] = useState(new Date().getHours());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const [seconds, setSeconds] = useState(new Date().getSeconds());

  useEffect(() => {
    const interval = setInterval(() => {
      setHours(new Date().getHours());
      setMinutes(new Date().getMinutes());
      setSeconds(new Date().getSeconds());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex items-center gap-0.5 font-mono'>
      <SlidingNumber value={hours} padStart={true} />
      <span className='text-zinc-500'>:</span>
      <SlidingNumber value={minutes} padStart={true} />
      <span className='text-zinc-500 mr-0.5'>:</span>
      <div className='text-sm text-zinc-400'>
        <SlidingNumber value={seconds} padStart={true} />
      </div>
    </div>
  );
}
