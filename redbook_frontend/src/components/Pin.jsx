import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { IoMdDownloadForOffline, MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'


import { client, urlFor } from '../client'


const Pin = ({ pin }) => {

    const [postHovered, setPostHovered] = useState(false);
    const [savingPost, setSavingPost] = useState(false);

    const navigate = useNavigate()

    const { postedBy, image, _id, destination } = pin;

    const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    let alreadySaved = pin?.save?.filter((item) => item?.postedBy?._id === user?._id);
    // if the user has alre
    alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];


    const savePin = (id) => {
        if (alreadySaved?.length === 0) {
            setSavingPost(true)
            client
                .patch(id)
                .setIfMissing({ save: [] })
                .insert('after', 'save[-1]', [{
                    _key: uuidv4(),
                    userId: user?._id,
                    postedBy: {
                        _type: 'postedBy',
                        _ref: user?._id
                    }
                }])
                .commit()
                .then(() => {
                    window.location.reload()
                    setSavingPost(false)
                })
        }
    }

    const deletePin = (id) => {
        client
            .delete(id)
            .then(() => {
                window.location.reload()
            })
    }


    return (
        <div className='m-2'>
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)}
                className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden duration-500 ease-in-out '
            >
                <img className='rounded-lg w-full' src={urlFor(image).width(250).url()} alt="user-post" />
                {postHovered && (
                    <div
                        className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
                        style={{ height: `100%` }}>
                        <div className='flex flex-wrap items-center justify-around h-full'>
                            <div className='flex absolute top-3 left-2'>
                                <a href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={(e) => e.stopPropagation()}>
                                    <MdDownloadForOffline className='bg-white m-2 w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none hover:p-1 transition-all' />
                                </a>
                            </div>
                            <div className='absolute top-2 right-2'>
                                {alreadySaved?.length !== 0 ? (
                                    <button type='button' className='bg-red-500 w-20 opacity-70 hover:opacity-100 text-white font-bold m-2 px-5 py-1 text-sm rounded-3xl hover:shadow-md outlined-none'>
                                        {pin?.save?.length} Saved
                                    </button>
                                ) : (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            savePin(_id)
                                        }}
                                        type='button' className='bg-red-500 mt-4 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-sm rounded-3xl hover:shadow-md outlined-none'>
                                        {pin?.save?.length}   {savingPost ? 'Saving' : 'Save'}
                                    </button>
                                )}
                            </div>
                            <div className='flex mt-20 justify-between items-center gap-2 w-full'>
                                {destination && (
                                    <a href={destination}
                                        target='_blank'
                                        rel='noreferrer'
                                        className='bg-white flex absolute bottom-2 left-2 items-center text-xs gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'
                                    >
                                        <BsFillArrowUpRightCircleFill />
                                        {destination?.slice(8, 16)}...
                                    </a>
                                )}
                                {postedBy?._id == user._id && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            deletePin(_id)
                                        }}
                                        type='button' className='absolute bottom-3 right-2 bg-white opacity-70 hover:opacity-100 font-bold px-2 py-2 text-sm rounded-full hover:shadow-md outlined-none'>
                                        <AiTwotoneDelete />
                                    </button>
                                )}

                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <Link to={`user-profile/${postedBy?._id}`} className='flex gap-2 mt-2 items-center'>
                    <img
                        className='w-8 h-8 rounded-full object-cover'
                        src={postedBy?.image}
                        alt="user-profile" />
                    <p className='font-semibold capitalize'>{postedBy?.userName}</p>
                </Link>
            </div>
        </div>
    )
}

export default Pin