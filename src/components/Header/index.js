import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
export default function Header() {
    return (
        <div className="row">
            <div className='col header'>
                <b className='brand'>Todo App</b>
                <div>
                    <Link className='link' to="/dashboard">Pending</Link>
                    <Link className='link' to="/dashboard/done">Done</Link>
                    <Link to="/dashboard/profile">
                        <img src='https://preview.redd.it/dh5otp8kcf741.png?width=640&crop=smart&auto=webp&s=d795f12b5e3eea1ef4d7ceb8244fca98e2384dbf'
                            className='img'
                            alt='img'
                        /></Link>
                </div>
            </div>
        </div>
    )
}
