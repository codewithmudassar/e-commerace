// components/BackButton.js
"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Render nothing until the component has mounted
  }

  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()}>
      <i className='bx bx-left-arrow-alt text-2xl ml-2 mt-2'></i> 
    </button>
  );
}
