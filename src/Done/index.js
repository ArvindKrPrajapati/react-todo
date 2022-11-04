import React, { useEffect, useState } from 'react'
import "../Dashboard/style.css"
import { Link } from 'react-router-dom'
import { _getDoneTasks } from '../api.service'
import Header from '../components/Header'
import Card from '../components/Card'

export default function Done() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchData = async () => {
        try {
            const res = await _getDoneTasks()
            if (res?.success) {
                setData(res.data)
            } else {
                setError(res.error)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError("something went wrong")
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='container-fluid main'>
            <Link to="/dashboard/add" className='add'>+</Link>
            <Header />
            <div className='container p-3'>
                <div className='row'>
                    <div className='col'>
                        <h2>Completed Todos</h2>
                        <small className='text-danger'>{error}</small>
                    </div>
                </div>
                {loading && <div className='loading'>loading....</div>}
                {(!loading && data.length === 0) ?
                    <div className='loading'>No Pending todos</div>
                    :
                    <div className='row'>
                        {
                            data.map((o) => (
                                <Card key={o._id} task={o} setData={setData} />
                            ))
                        }
                    </div>
                }

            </div>
        </div>
    )
}
