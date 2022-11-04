import React, { useEffect, useState } from 'react'
import './style.css'
import Header from '../components/Header'
import { _changeName, _changePassword, _getProfile } from '../api.service'
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [changingName, setChangingName] = useState(false)
    const [changingPass, setChangingPass] = useState(false)
    const [nameError, setNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigate("/")
    }

    const fetchUser = async () => {
        const res = await _getProfile()
        if (res?.success) {
            setUser(res.data)
        } else {
            // handle error
        }
        setLoading(false)
    }

    const changeName = async (e) => {
        e.preventDefault()
        setNameError('')
        const name = e.target[0].value
        if (name) {
            setChangingName(true)
            const res = await _changeName(name)
            if (res?.success) {
                e.target[0].value = ''
                setUser({ ...user, name })
            } else {
                setNameError(res.error)
            }
            setChangingName(false)
        } else {
            setNameError("New Name is required")
        }
    }

    const changePassword = async (e) => {
        e.preventDefault()
        setPasswordError('')
        const password = e.target[0].value
        const newpass = e.target[1].value
        if (newpass.length < 8) {
            setPasswordError("password must be greater or equal to 8 digits")
            return
        }
        if (password && newpass) {
            if (password === newpass) {
                setPasswordError("old password and new pasword must not be same")
            } else {
                setChangingPass(true)
                const res = await _changePassword(password, newpass)
                if (res?.success) {
                    e.target[0].value = ''
                    e.target[1].value = ''
                    alert("Password changed")
                } else {
                    setPasswordError(res.error)
                }
                setChangingPass(false)
            }
        } else {
            setPasswordError("Both fiels are required")
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div className='container-fluid main'>
            <Header />
            {
                loading ?
                    <div className='loading'>loading.....</div>
                    :
                    <div className='container '>
                        <div className='row'>
                            <div className='col d-flex align-items-center justify-content-center p-3'>
                                <img src='https://preview.redd.it/dh5otp8kcf741.png?width=640&crop=smart&auto=webp&s=d795f12b5e3eea1ef4d7ceb8244fca98e2384dbf'
                                    className='pimg'
                                    alt="img"
                                />
                                <div>
                                    <h4>{user.name}</h4>
                                    <button onClick={logout} className='btn btn-danger'>Log out</button>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='card big-card'>
                                <h5>Change Name</h5>
                                <small className='text-danger'>{nameError}</small>
                                <form onSubmit={changeName}>
                                    <div class="form-group">
                                        <label for="name">New Name</label>
                                        <input type="text" class="form-control" id="name" name='name' />
                                    </div>
                                    <button type="submit" class="btn btn-primary w-100 loginBtn" disabled={changingName}>{changingName ? "Changing" : "Change name"}</button>

                                </form>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='card big-card'>
                                <h5>Change Password</h5>
                                <small className='text-danger'>{passwordError}</small>
                                <form onSubmit={changePassword}>
                                    <div class="form-group">
                                        <label for="password">old Password</label>
                                        <input type="password" class="form-control" id="password" name='password' />
                                    </div>
                                    <div class="form-group">
                                        <label for="newpass">New Password</label>
                                        <input type="password" class="form-control" id="newpass" name='newpass' />
                                    </div>
                                    <button type="submit" class="btn btn-primary w-100 loginBtn" disabled={changingPass}>{changingPass ? "Changing" : "Change password"}</button>

                                </form>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
