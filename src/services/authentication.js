const TMDB_TOKEN = process.env.REACT_APP_TMDB_TOKEN;

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