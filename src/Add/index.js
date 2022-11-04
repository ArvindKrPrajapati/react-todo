import React, { useState } from 'react'
import { _addTask } from '../api.service'
import Header from '../components/Header'
import { useNavigate } from "react-router-dom"
import './style.css'
export default function Add() {
    const [task, setTask] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const handleAdd = async () => {
        if (task) {
            setLoading(true)
            const res = await _addTask(task)
            if (res.success) {
                setTask("")
                navigate("/dashboard")

            } else {
                setError(res.error)
            }
            setLoading(false)
        }
    }
    return (
        <div className='container-fluid'>
            <Header />
            <div className="container p-4">
                <small className='text-danger'>{error}</small>
                <textarea className='form-control task' onChange={(e) => { setTask(e.target.value) }} />
                <button disabled={loading} className='btn btn-primary mt-4 add-btn' onClick={handleAdd}>{loading ? "adding" : "Add"}</button>
            </div>
        </div>
    )
}
