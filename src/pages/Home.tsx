import React, { useEffect, useState } from 'react';
import SectionCard from '../components/SectionCard';
import HorizontalScrollsection from '../components/HorizontalScrollSection';
import { fetchNowPlaying, fetchTopRated } from '../services/movieApi';

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState<{ id:number, title: any; year: string; posterUrl: string; }[]>([]);
  const [topRated, setTopRated] = useState<{  id:number, title: any; year: string; posterUrl: string; }[]>([]);;

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [nowPlayingData, topRatedData] = await Promise.all([
          fetchNowPlaying({ language: 'en-US', page: 1 }),
          fetchTopRated({ language: 'en-US', page: 1 }),
        ]);

        const formatMovies = (movies: any[]) =>
          movies.map((movie: { id:number, title: any; release_date: string; poster_path: any; }) => ({
            id: movie.id,
            title: movie.title,
            year: movie.release_date?.split('-')[0],
            posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }));

        setNowPlaying(formatMovies(nowPlayingData));
        setTopRated(formatMovies(topRatedData));
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    loadMovies();
  }, []);
  return (
    <div className="bg-black min-h-screen ">
      <div className="container mx-auto px-4 py-6 ">
        <HorizontalScrollsection title="Now Playing" movies={nowPlaying}/>
        <SectionCard title="Top Rated" movies={topRated} />
      </div>
       
    </div>
    
  );
};

export default Home;
