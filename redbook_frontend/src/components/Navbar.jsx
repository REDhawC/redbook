import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'


const Navbar = ({ searchTerm, setSearchTerm, user }) => {
    const navigate = useNavigate()

    if (!user) return null

    return (
        <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
            <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none ontline-none focus-within:shadow-lg shadow-md'>
                <IoMdSearch fontSize={21} className='ml-1' />
                <input
                    type='text'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search'
                    value={searchTerm}
                    onFocus={() => navigate('/search')}
                    className='p-2 w-full bg-white outline-none'
                />
            </div>
            <div className='flex gap-3'>
                <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
                    <img src={user.image} className='w-14 h-11 rounded-lg' alt="user" />
                </Link>
                <Link to={`create-pin`} className='bg-black text-2xl transition-all duration-375 hover:text-4xl hover:shadow-md hover:bg-red-600 text-white rounded-lg w-12 h-12 md:w-14 md:h-11 flex justify-center items-center'>
                    <IoMdAdd ></IoMdAdd>
                </Link>

            </div>
        </div>
    )
}

export default Navbar