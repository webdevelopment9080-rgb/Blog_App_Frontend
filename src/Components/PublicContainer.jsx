import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { useDispatch } from 'react-redux'
import { getMe } from '../features/authenticationSlice/authenticationSlice'

function PublicContainer() {


  let dispatch = useDispatch();
  let token = localStorage.getItem("token");


  useEffect(()=>{
    if (token) {
      dispatch(getMe()).unwrap();
    }

  }, [])
  return (
    <>
    <Header></Header>
    <Outlet></Outlet>
    {/* <Footer></Footer> */}
    </>
  )
}

export default PublicContainer