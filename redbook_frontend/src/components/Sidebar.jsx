import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'
import { categories } from '../utils/data'

import logo from '../assets/logo.png'

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black hover:text-lg hover:text-red-600 transition-all duration-500 ease-in-out capitalize'
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold p-1 text-white bg-red-600 border-red-600 transition-all duration-1000 ease-in-out capitalize'

const sidebar = ({ user }, closeToggle) => {

    const handleCloseSidebar = () => {
        if (closeToggle) { closeToggle(false) }
    }

    return (
        <div className='flex flex-col justify-between bg-white h-full overflow-y-scrikk min-w-210 hide-scrollbar'>
            <div className='flex flex-col'>
                <Link
                    to='/'
                    className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
                    onClick={handleCloseSidebar}>
                    <img src={logo} alt="logo" className='m-6 w-24' />
                </Link>
                <div className='flex flex-col gap-5'>
                    <NavLink
                        to='/'
                        className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                        onClick={handleCloseSidebar}
                    >
                        <RiHomeFill />
                        <span className='text-lg'>Home</span> 
                    </NavLink>
                    <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover categories</h3>
                    {categories.slice(0, categories.length - 1).map((category) =>
                    (
                        <NavLink
                            to={`/category/${category.name}`}
                            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                            onClick={handleCloseSidebar}
                            key={category.name}
                        >
                            <img src={category.image} className="w-8 h-8 rounded-full shadow-sm" alt='category' />
                            {category.name}
                        </NavLink>
                    )
                    )}
                </div>
                {user && (
                    <Link
                        to={`user-profile/${user._id}`}
                        className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
                        onClick={handleCloseSidebar}
                    >
                        <img src={user.image} className='w-10 h-10 rounded-full ' alt="user-profile" />
                        <p className='font-bold'>{user.userName}</p>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default sidebar