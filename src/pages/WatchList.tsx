import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SectionCard from '../components/SectionCard';
import { fetchWathcListMovie } from '../services/movieApi';

const moviesData = [
    { id: 1, title: 'Bliss', year: '2021', posterUrl: '/images/movie1.png' },
    { id: 1,title: 'Malcolm & Marie Malcolm & Marie', year: '2021', posterUrl: '/images/movie2.png' },
    { id: 1, title: 'Dune', year: '2021', posterUrl: '/images/movie3.png' },
    { id: 1, title: 'Bliss', year: '2021', posterUrl: '/images/movie1.png' },
    { id: 1, title: 'Malcolm & Marie', year: '2021', posterUrl: '/images/movie2.png' },
    { id: 1, title: 'Dune', year: '2021', posterUrl: '/images/movie3.png' },
    { id: 1, title: 'Bliss', year: '2021', posterUrl: '/images/movie1.png' },
    { id: 1, title: 'Malcolm & Marie', year: '2021', posterUrl: '/images/movie2.png' },
    { id: 1, title: 'Dune', year: '2021', posterUrl: '/images/movie3.png' },
  ];

const WatchList = () => {
    const [watchListMovies, setWatchListMovies] = useState<{ id:number, title: any; year: string; posterUrl: string; }[]>([]);

    useEffect(() => {
        const loadWatchListMovies = async () => {
            try {
                const watchListMoviesData = await fetchWathcListMovie({ language: 'en-US', page: 1, session_id: localStorage.getItem('tmdb_session_id'), account_id: localStorage.getItem('tmdb_account_id') });
                const formatMovies = (movies: any[]) =>
                    movies.map((movie: { id:number, title: any; release_date: string; poster_path: any; }) => ({
                        id: movie.id,
                        title: movie.title,
                        year: movie.release_date?.split('-')[0],
                        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    }));

                setWatchListMovies(formatMovies(watchListMoviesData));
            } catch (error) {
                console.error('Failed to fetch watchlist movies:', error);
            }
        };

        loadWatchListMovies();
    }, [])
    return (
        <div className="bg-black min-h-screen ">
        <div className="container mx-auto px-4 py-6 ">
            <SectionCard title="Your Watchlist" movies={watchListMovies} />
        </div>
        </div>
    );
}

export default WatchList;