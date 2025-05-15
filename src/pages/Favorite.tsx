import React, { useEffect, useState } from 'react';

import SectionCard from '../components/SectionCard';
import { fetchFavoriteMovie } from '../services/movieApi';

const Favorite = () => {
    const [favoriteMovies, setFavoriteMovies] = useState<{ id:number, title: any; year: string; posterUrl: string; isFavorite?: boolean; }[]>([]);

    useEffect(() => {
        const loadFavoriteMovies = async () => {
            try {
                const favoriteMoviesData = await fetchFavoriteMovie({ language: 'en-US', page: 1, session_id: localStorage.getItem('tmdb_session_id'), account_id: localStorage.getItem('tmdb_account_id') });
                const formatMovies = (movies: any[]) =>
                    movies.map((movie: { id:number, title: any; release_date: string; poster_path: any; }) => ({
                        id: movie.id,
                        title: movie.title,
                        year: movie.release_date?.split('-')[0],
                        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                        isFavorite: true,
                    }));

                setFavoriteMovies(formatMovies(favoriteMoviesData));
            } catch (error) {
                console.error('Failed to fetch favorite movies:', error);
            }
        };

        loadFavoriteMovies();
    }, []);
    return (
        <div className="bg-black min-h-screen ">
            <div className="container mx-auto px-4 py-6 ">
                <SectionCard title="Your Favorite Movies" movies={favoriteMovies} />
            </div>
        </div>
    );
}

export default Favorite;