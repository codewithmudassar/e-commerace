import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className=''>
      <footer class=" bg-white rounded-lg shadow m-4">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center">© 2023 <Link href="https://flowbite.com/" className="hover:underline">Flowbite™</Link>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
        <li>
            <Link href="#" class="hover:underline me-4 md:me-6">About</Link>
        </li>
        <li>
            <Link href="#" class="hover:underline me-4 md:me-6">Privacy Policy</Link>
        </li>
        <li>
            <Link href="#" class="hover:underline me-4 md:me-6">Licensing</Link>
        </li>
        <li>
            <Link href="#" class="hover:underline">Contact</Link>
        </li>
    </ul>
    </div>
</footer>

    </div>
  )
}

export default Footer
