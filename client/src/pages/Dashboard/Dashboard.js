import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { getProducts } from '../../redux/features/product/productSlice'

const Dashboard = () => {
  useRedirectLoggedOutUser("/login")
const dispatch = useDispatch()

useEffect(() => {
  const cccc = dispatch(getProducts())
  console.log(cccc)
},[])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard