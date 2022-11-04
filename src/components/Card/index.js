import React, { useState } from 'react'
import { formatDate, _deleteTask, _toggleTaskStatus } from '../../api.service'
import './style.css'
import { MdDelete } from "react-icons/md"
export default function Card({ task, setData }) {
    const [deleting, setDeleting] = useState(false)
    const [changingStatus, setChangingStatus] = useState(false)
    const [error, setError] = useState('')
    const deleteTask = async () => {
        const todoid = task._id
        setDeleting(true)
        const res = await _deleteTask(todoid)
        if (res?.success) {
            setData((current) =>
                current.filter((o) => o._id !== todoid)
            );
        } else {
            setError(res.error)
        }
        setDeleting(false)
    }

    const handleChange = async () => {
        const done = !task.done
        const todoid = task._id
        setChangingStatus(true)
        const res = await _toggleTaskStatus(todoid, done)
        if (res?.success) {
            setData(current =>
                current.map(obj => {
                    if (obj._id === todoid) {
                        return { ...obj, done };
                    }
                    return obj;
                }),
            );
        } else {
            // handle error
        }
        setChangingStatus(false)

    }
    return (
        <div className='col-md-3 col-12'>
            <div className='card m-2'>
                <small className='text-danger'>{error}</small>
                <p>{task.task}</p>
                <div className='d-flex justify-content-between mt-2 align-items-center'>
                    <button disabled={deleting} onClick={deleteTask} className='btn'>
                        <MdDelete className='text-danger' />
                    </button>
                    <strong className='m-0'>{formatDate(task.datetime)}</strong>
                    <input disabled={changingStatus} type="checkbox" checked={task.done} onChange={handleChange} />
                </div>
            </div>
        </div>
    )
}
