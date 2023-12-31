import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { Navbar, Feed, PinDetail, CreatePin, Search } from '../components'

const Pins = ({ user }) => {
    const navigate = useNavigate()

    if (!user) {
        navigate('/login')
    }

    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div className='px-2 md:px-5'>
            <div className='bg-grey-50'>
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user}></Navbar>
            </div>
            <div className='h-full'>
                <Routes>
                    <Route path='/' element={<Feed />}></Route>
                    <Route path='/category/:categoryId' element={<Feed />}></Route>
                    <Route path='/pin-detail/:pinId' element={<PinDetail user={user} />}></Route>
                    {/* :pinId can be fetched in <PinDetail /> using useParams() */}
                    <Route path='/create-pin' element={<CreatePin user={user} />}></Route>
                    <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}></Route>
                </Routes>
            </div>
        </div>
    )
}

export default Pins