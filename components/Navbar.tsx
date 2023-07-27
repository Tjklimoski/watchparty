import React from 'react'

export default function Navbar() {
  return (
    <div className='sticky top-0 w-full max-w-screen-2xl px-6 py-2 md:px-12 md:py-4 flex items-center gap-4 md:gap-6 bg-base-100 bg-opacity-75 backdrop-blur-md'>
      <div>
        <h1 className='text-3xl'>Watch<span className='text-primary'>Party</span></h1>
      </div>
    </div>
  )
}
