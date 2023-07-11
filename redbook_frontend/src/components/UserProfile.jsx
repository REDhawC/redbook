import React, { useState, useEffect } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useParams, useNavigate } from 'react-router-dom'

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spin from './Spin'

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = () => {

    const [user, setUser] = useState(null);
    const [pins, setPins] = useState(null);
    const [text, setText] = useState('Created');
    const [activeBtn, setActiveBtn] = useState('created');
    const navigate = useNavigate()
    const { userId } = useParams()

    useEffect(() => {
        if (text === 'Created') {
            const createdPinsQuery = userCreatedPinsQuery(userId)

            client.fetch(createdPinsQuery)
                .then((data) => {
                    setPins(data)
                })
        } else {
            const savedPinsQuery = userSavedPinsQuery(userId)

            client.fetch(savedPinsQuery)
                .then((data) => {
                    setPins(data)
                })
        }
    }, [text, userId]);

    const logOut = () => {
        localStorage.clear();

        navigate('/login');
    };

    useEffect(() => {
        const query = userQuery(userId)

        client.fetch(query)
            .then((data) => {
                setUser(data[0])
            })
    }, [userId]);

    if (!user) {
        return <Spin message={`Loading profile...`} />
    }

    return (
        <div className='relative pb-2 h-full justify-center'>
            <div className='flex flex-col pb-5'>
                <div className='relative flex flex-col mb-7'>
                    <div className='flex flex-col justify-center items-center'>
                        <img src="https://source.unsplash.com/1600x900/?nature,technology"
                            alt="user-pic"
                            className='w-full h-48 2xl:h-510 shadow-lg object-cover' />
                        <img
                            className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
                            src={user.image} alt="user-image" />
                        <h1 className='font-bold text-3xl text-center mt-3'>
                            {user.userName}
                        </h1>
                        <div className='absolute top-0 z-1 right-0 p-2'>
                            {userId === user._id && (
                                <button onClick={logOut}>
                                    <div className='flex flex-col w-24 h-16 transition-all items-center justify-center bg-white opacity-50 hover:opacity-100 hover:text-[#de2020] rounded-md'>
                                        <AiOutlineLogout className='text-2xl' />
                                        <p className='font-bold'>Sign out</p>
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>
                    <div className='text-center mb-7'>
                        <button
                            type="button"
                            onClick={(e) => {
                                setText(e.target.textContent);
                                setActiveBtn('created');
                            }}
                            className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
                        >
                            Created
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                setText(e.target.textContent);
                                setActiveBtn('saved');
                            }}
                            className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
                        >
                            Saved
                        </button>
                    </div>
                    {pins?.length > 0 ? (
                        <div className='px-2'>
                            <MasonryLayout pins={pins} />
                        </div>
                    ) : (
                        <div className='flex justify-center font-bold items-center w-full text-1xl mt-2'>
                            No pins found!
                        </div>
                    )}


                </div>

            </div>
        </div>
    )
}

export default UserProfile