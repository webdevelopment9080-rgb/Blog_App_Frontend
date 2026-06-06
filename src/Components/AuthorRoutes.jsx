import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

function AuthorRoutes() {
  
    const {token, user} = useSelector(state => state.authentication.authentication)
    if (!token) {
        return <Navigate to={"/login"} replace></Navigate>
    }

    if ( user && user.role !== "author") {
        return <Navigate to={'/'} replace> </Navigate>
    }

    return (
    <>
    <Outlet></Outlet>
    </>
  )
}

export default AuthorRoutes