const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNWUxNzI0MDE3NGUzM2QwZjJjYTNhNjM0NTBhZDIyOSIsIm5iZiI6MTc0NzE0MjY2NC45ODcsInN1YiI6IjY4MjM0ODA4MzcxYWFkNGMzZjJkMjEyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n6zeIMXXcnKTvqulVT7o9Q0WDdi4VV-2ZL1u0_Cag7M"

export const fetchNowPlaying = async({ language, page } = {}) => {
    const params = new URLSearchParams({
        language,
        page,
    });

    const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?${params.toString()}`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_TOKEN}`,
        },
    });

    const data = await res.json();
    return data.results;
};

export const fetchTopRated = async({ language, page }) => {
    const params = new URLSearchParams({ language, page });

    const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?${params.toString()}`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_TOKEN}`,
        },
    });

    const data = await res.json();
    return data.results;
};

export const fetchDetailMovie = async({ language, id }) => {
    const params = new URLSearchParams({ language });

    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?${params.toString()}`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_TOKEN}`,
        },
    });

    const data = await res.json();
    return data;
};

export const fetchRecommendationMovie = async({ language, page, id }) => {
    const params = new URLSearchParams({ language, page, id });

    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?${params.toString()}`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_TOKEN}`,
        },
    });

    const data = await res.json();
    return data.results;
};

export const fetchFavoriteMovie = async({ language, page, session_id, account_id }) => {
    const params = new URLSearchParams({ language, page, session_id });

    const res = await fetch(`https://api.themoviedb.org/3/account/${account_id}/favorite/movies?${params.toString()}`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_TOKEN}`,
        },
    });

    const data = await res.json();
    return data.results;
}

export const fetchWathcListMovie = async({ language, page, session_id, account_id }) => {
    const params = new URLSearchParams({ language, page, session_id });

    const res = await fetch(`https://api.themoviedb.org/3/account/${account_id}/watchlist/movies?${params.toString()}`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_TOKEN}`,
        },
    });

    const data = await res.json();
    return data.results;
}

export const addFavoriteMovie = async({ account_id, session_id, media_id, favorite = true }) => {
    const url = `https://api.themoviedb.org/3/account/${account_id}/favorite?session_id=${session_id}`;

    const body = {
        media_type: 'movie',
        media_id,
        favorite,
    };

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${TMDB_TOKEN}`,
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to add favorite: ${error}`);
    }

    return res.json();
};

export const addWatchMovie = async({ account_id, session_id, media_id, watchlist = true }) => {
    const url = `https://api.themoviedb.org/3/account/${account_id}/watchlist?session_id=${session_id}`;

    const body = {
        media_type: 'movie',
        media_id,
        watchlist,
    };

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${TMDB_TOKEN}`,
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to add favorite: ${error}`);
    }

    return res.json();
};