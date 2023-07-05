import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spin from './Spin'
import { searchQuery } from '../utils/data'

const Feed = () => {

    const [loading, setLoading] = useState(false);
    const { categoryId } = useParams()
    const [pins, setPins] = useState(null);

    useEffect((categoryId) => {
        setLoading(true)
        if (categoryId) {
            const query = searchQuery(categoryId)

            client.fetch(query)
                .then((data) => {
                    setPins(data)
                    setLoading(false)
                })
        }
        else {

        }

    }, [categoryId]);

    if (loading) return <Spin message="We are adding new ideas to your feed!"></Spin>

    return (
        <div>
            Feed
        </div>
    )
}

export default Feed