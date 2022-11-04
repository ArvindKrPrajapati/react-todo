import React, { useState } from 'react'
import Waves from '../components/Waves'
import './style.css'
import { Link } from 'react-router-dom'
import { _login } from '../api.service'
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()


    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        const mobile = e.target[0].value;
        const password = e.target[1].value;
        if (mobile?.length == 10 && password?.length >= 8) {
            setLoading(true)
            const res = await _login(mobile, password)
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
                        <label for="mobile">Mobile Number</label>
                        <input type="number" class="form-control" id="mobile" name='mobile' />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" name='password' />
                    </div>
                    <button type="submit" class="btn btn-primary w-100 loginBtn" disabled={loading}>{loading ? "loging in...." : "Login"}</button>
                    <div className='d-flex justify-content-center mt-2'>
                        <small>Dont have accont?</small>
                        <Link to="signup" className='text-dark text-decoration-none'>Register</Link>
                    </div>
                </form>
            </div>
        </Waves>
    )
}
