import React, { useState } from 'react'
import Waves from '../components/Waves'
import '../Login/style.css'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { _signup } from '../api.service'

export default function Signup() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        const name = e.target[0].value;
        const mobile = e.target[1].value;
        const password = e.target[2].value;
        if (mobile?.length === 10 && password?.length >= 8) {
            setLoading(true)
            const res = await _signup(name, mobile, password)
            if (res?.success) {
                localStorage.setItem("token", res.data.token)
                console.log(res);
                navigate("/dashboard")
            } else {
                setError(res?.error)
            }
            setLoading(false)
        } else {
            setError("Invalid mobile or password is less than 8 digit")
        }
    }

    return (
        <Waves>
            <div>
                <form className='form' onSubmit={handleLogin}>
                    <small className='text-danger'>{error}</small>
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" class="form-control" id="name" name='name' />
                    </div>
                    <div class="form-group">
                        <label for="mobile">Mobile Number</label>
                        <input type="number" class="form-control" id="mobile" name='mobile' />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" name='password' />
                    </div>
                    <button type="submit" class="btn btn-primary w-100 loginBtn" disabled={loading}>{loading ? "signing in...." : "Sign up"}</button>
                    <div className='d-flex justify-content-center mt-2'>
                        <small>Already have accont?</small>
                        <Link to="/" className='text-dark text-decoration-none'>Login</Link>
                    </div>
                </form>
            </div>
        </Waves>
    )
}
