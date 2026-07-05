import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'

const UserLogout = () => {
  const { setUser } = useContext(UserDataContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const doLogout = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, { withCredentials: true })
        setUser({
          email: '',
          fullName: { firstName: '', lastName: '' }
        })
        navigate('/login')
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

export default UserLogout
