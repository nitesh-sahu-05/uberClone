import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCaptain } from '../context/CaptainContext.jsx'

const CaptainLogout = () => {
  const { logoutCaptain } = useCaptain()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const doLogout = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, { withCredentials: true })
        logoutCaptain()
        navigate('/captain-login')
      } catch (err) {
        setError(err?.response?.data?.message || err.message)
      } finally {
        setLoading(false)
      }
    }

    doLogout()
  }, [])

  if (loading) return <div className="p-4">Logging out...</div>
  if (error) return <div className="p-4 text-red-600">Error logging out: {error}</div>
  return null
}

export default CaptainLogout
