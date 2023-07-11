import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import jwt_decode from 'jwt-decode'
import { client } from '../client'


const Login = () => {
    const navigate = useNavigate()

    const responseGoogle = (res) => {
        const decoded = jwt_decode(res.credential)
        console.log(decoded)
        const { name, sub, picture } = decoded
        const user = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture
        }
        localStorage.setItem('user', JSON.stringify(user))
        client.createIfNotExists(user)
            .then(() => {
                navigate('/', { replace: true })
            })
    }

    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video
                    src={shareVideo}
                    type='video/mp4'
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className='w-full h-full object-cover'
                />
            </div>
            <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                <div className="p-5">
                    <img src={logo} alt='logo' width='130px' />
                </div>
                <div className='flex justify-center'>
                    <GoogleLogin onSuccess={responseGoogle}
                        onError={responseGoogle} />
                </div>
            </div>

        </div>

    )
}

export default Login