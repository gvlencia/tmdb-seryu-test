const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNWUxNzI0MDE3NGUzM2QwZjJjYTNhNjM0NTBhZDIyOSIsIm5iZiI6MTc0NzE0MjY2NC45ODcsInN1YiI6IjY4MjM0ODA4MzcxYWFkNGMzZjJkMjEyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n6zeIMXXcnKTvqulVT7o9Q0WDdi4VV-2ZL1u0_Cag7M"

export const getRequestToken = async() => {
    const res = await fetch('https://api.themoviedb.org/3/authentication/token/new', {
        headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            'Content-Type': 'application/json',
        },
    })

    const data = await res.json()
    return data.success ? data.request_token : null
}

export const createSession = async(requestToken) => {
    const res = await fetch('https://api.themoviedb.org/3/authentication/session/new', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ request_token: requestToken }),
    })

    const data = await res.json()
    return data.success ? data.session_id : null
}

export const logoutSession = async(sessionId) => {
    const res = await fetch('https://api.themoviedb.org/3/authentication/session', {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id: sessionId }),
    })

    const data = await res.json()
    return data.success
}