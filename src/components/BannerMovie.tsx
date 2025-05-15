import React from 'react';
import ButtonFav from './ButtonFav';
import ButtonWatch from './ButtonWatchList';

interface MovieDetail{
    id: number;
    original_title: string;
    year: string;
    posterUrl: string;
    bannerUrl: string;
    overview: string;
    genres: string[];
    voteAverage: number;
    release_date: string;
    runtime: number;
    tagline: string;
}
interface MovieDataProps {
    movie: MovieDetail;
} 

const BannerMovie: React.FC<MovieDataProps> = ({movie}) => {
    const formatRuntime = (runtime: number) => {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}m`;
    }
    const formatGenres = (genres: string[]) => {
        return genres.map((genre) => genre.charAt(0).toUpperCase() + genre.slice(1)).join(', ');
    }
    const formatVoteAverage = (voteAverage: number) => {
        return Math.round(voteAverage * 10);
    }
    return (
        <div
            className="relative w-full h-[500px] bg-cover bg-center relative"
            style={{
                backgroundImage: `url(${movie.bannerUrl})`,
              }}
        >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="container mx-auto relative z-10 flex items-center gap-8 py-20 text-white">
                <img
                src={movie.posterUrl}
                alt={movie.original_title}
                className="w-[250px] rounded-lg shadow-lg"
                />

                <div className="max-w-2xl">
                    <h1 className="text-5xl font-bold">
                        {movie.original_title} <span className="text-gray-300">({movie.year})</span>
                    </h1>

                    <p className="mt-2 text-gray-300">{movie.release_date} • {formatGenres(movie.genres)} • {formatRuntime(movie.runtime)}</p>


                    <div className="flex items-center gap-4 mt-4">
                        <div className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center font-bold">
                            <div className="relative size-40">
                                <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-[#EDEDED]" strokeWidth="2"></circle>
                                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-blue-600 dark:text-blue-500" strokeWidth="2" strokeDasharray={formatVoteAverage(movie.voteAverage)}strokeDashoffset="0" strokeLinecap="round"></circle>
                                </svg>
                                <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                    <span className="text-center text-sm font-bold text-blue-600 dark:text-blue-500">{formatVoteAverage(movie.voteAverage)}</span>
                                </div>
                            </div>
                        </div>
                        <p>User Score</p>
                        <ButtonWatch id={movie.id} />
                        <ButtonFav id={movie.id} />
                    </div>
                    <p className="italic mt-6 text-lg text-gray-200">{movie.tagline}</p>
                    <div className="mt-4">
                        <h2 className="font-bold text-xl mb-1">Overview</h2>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerMovie;