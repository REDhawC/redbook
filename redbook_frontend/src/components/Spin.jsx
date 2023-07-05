import React from 'react'
import {Circles} from 'react-loader-spinner'

const Spin = ({ message }) => {
    return (
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <Circles 
                color='red'
                height={100}
                width={200}
                className="m-5"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            <p className='text-lg text-center px-2'>{message}</p>
        </div>
    )
}

export default Spin