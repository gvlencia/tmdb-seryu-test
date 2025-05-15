import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createSession } from '../services/authentication'

const TMDBAuth = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const finalize = async () => {
      const token = localStorage.getItem('tmdb_request_token')
      if (!token) {
        navigate('/')
        return
      }

      const sessionId = await createSession(token)
      if (sessionId) {
        localStorage.setItem('tmdb_session_id', sessionId)
        navigate('/favorite')
      } else {
        navigate('/')
      }
    }

    finalize()
  }, [navigate])

  return <p>Logging in...</p>
}

export default TMDBAuth
