import React, { useState, useEffect } from 'react'
import TMDBLoginModal from './TMDBLoginModal'

interface Props {
  children: React.ReactNode
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [checkedLogin, setCheckedLogin] = useState(false)

  useEffect(() => {
    const sessionId = localStorage.getItem('tmdb_session_id')
    setIsLoggedIn(!!sessionId)
    setCheckedLogin(true)
  }, [])

  if (!checkedLogin) return null 

  return (
    <>
      <TMDBLoginModal show={!isLoggedIn} />
      {isLoggedIn && children}
    </>
  )
}

export default PrivateRoute
