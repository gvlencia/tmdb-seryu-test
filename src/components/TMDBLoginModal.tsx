import { useState, useEffect } from 'react'
import { getRequestToken } from '../services/authentication'

interface TMDBLoginModalProps {
  show: boolean
}

const TMDBLoginModal = ({ show }: TMDBLoginModalProps) => {
  const handleLogin = async () => {
    const token = await getRequestToken()
    if (token) {
      localStorage.setItem('tmdb_request_token', token)
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/auth`
    }
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center gap-4">
        <img src="/images/tmdb.png" alt="TMDB" className="w-24 h-24" />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handleLogin}
        >
          Login with TMDB
        </button>
      </div>
    </div>
  )
}

export default TMDBLoginModal
