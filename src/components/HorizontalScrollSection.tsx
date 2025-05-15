import React from 'react';
import MovieCard from './MovieCard';
import '../styles/Scrollbar.css'; // Import your CSS file

interface Movie {
    id: number;
    title: string;
    year: string;
    posterUrl: string;
  }
  
interface ScrollSectionProps {
    title: string;
    movies: Movie[];
}

const HorizontalScrollsection: React.FC<ScrollSectionProps> = ({ title, movies }) => {
    return (
        <div className="bg-black py-8">
            <h1 className="text-white text-3xl font-bold mb-6 section-card-title">{title}</h1>
            <div className="overflow-x-auto whitespace-nowrap px-4 scroll-white">
            {movies.map((movie, idx) => (
                <div key={idx} className="inline-block mr-4">
                <MovieCard
                    id={movie.id}
                    title={movie.title}
                    year={movie.year}
                    image={movie.posterUrl}
                />
                </div>
            ))}
            </div>
        </div>
    );
};

export default HorizontalScrollsection;