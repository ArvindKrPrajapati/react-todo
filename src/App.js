import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Add from './Add';
import Dashboard from './Dashboard';
import Done from './Done';
import Login from './Login';
import Profile from './Profile';
import Signup from './Signup';

export default function App() {
    function RequireAuth({ children }) {
        const authed = localStorage.getItem("token") ? true : false
        return authed === true ? children : <Navigate to="/" replace />;
    }
    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/dashboard" element={
                <RequireAuth>
                    <Dashboard />
                </RequireAuth>
            } />
            <Route exact path="/dashboard/add" element={
                <RequireAuth>
                    <Add />
                </RequireAuth>
            } />
            <Route exact path="/dashboard/done" element={
                <RequireAuth>
                    <Done />
                </RequireAuth>
            } />
            <Route exact path="/dashboard/profile" element={
                <RequireAuth>
                    <Profile />
                </RequireAuth>
            } />
        </Routes>
    );
}
