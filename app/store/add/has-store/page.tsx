import Link from 'next/link'
import React from 'react'

const HasStore = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center gap-2'>
        <h1 className='text-2xl font-semibold'>Kamu sudah mempunyai store, tidak dapat menambah store lagi!</h1>
        <Link href='/' className='bg-blue-600 text-white rounded px-5 py-2'>Kembali ke Homepage</Link>
    </div>
  )
}

export default HasStore