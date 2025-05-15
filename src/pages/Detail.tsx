import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import BannerMovie from '../components/BannerMovie';
import HorizontalScrollsection from '../components/HorizontalScrollSection';
import { fetchDetailMovie, fetchRecommendationMovie } from '../services/movieApi';

// const moviesData = [
//     { title: 'Bliss', year: '2021', posterUrl: '/images/movie1.png' },
//     { title: 'Malcolm & Marie Malcolm & Marie', year: '2021', posterUrl: '/images/movie2.png' },
//     { title: 'Dune', year: '2021', posterUrl: '/images/movie3.png' },
//     { title: 'Bliss', year: '2021', posterUrl: '/images/movie1.png' },
//     { title: 'Malcolm & Marie', year: '2021', posterUrl: '/images/movie2.png' },
//     { title: 'Dune', year: '2021', posterUrl: '/images/movie3.png' },
//     { title: 'Bliss', year: '2021', posterUrl: '/images/movie1.png' },
//     { title: 'Malcolm & Marie', year: '2021', posterUrl: '/images/movie2.png' },
//     { title: 'Dune', year: '2021', posterUrl: '/images/movie3.png' },
//   ];

const Detail = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [loadingRecom, setLoadingRecom] = useState(true);

    const [detailMovie, setDetailMovie] = useState<{
        id: number,
        original_title: string,
        year: string,
        posterUrl: string,
        bannerUrl: string,
        overview: string,
        genres: string[],
        voteAverage: number,
        release_date: string,
        runtime: number,
        tagline: string,
    }>({
        id: 0,
        original_title: '',
        year: '',
        posterUrl: '',
        bannerUrl: '',
        overview: '',
        genres: [],
        voteAverage: 0,
        release_date: '',
        runtime: 0,
        tagline: '',
    });

    const [recomMovies, setRecomMovies] = useState<{ id:number, title: any; year: string; posterUrl: string; }[]>([]);

    useEffect(() => {
        const loadDetailMovie = async () => {
            setLoading(true);
            setDetailMovie({
                id: 0,
                original_title: '',
                year: '',
                posterUrl: '',
                bannerUrl: '',
                overview: '',
                genres: [],
                voteAverage: 0,
                release_date: '',
                runtime: 0,
                tagline: '',
              });
            try {
                const detailMovieData = await fetchDetailMovie({ language: 'en-US', id: id });
                // console.log(detailMovieData)
                const formattedMovie = {
                    id: detailMovieData.id,
                    original_title: detailMovieData.original_title,
                    year: detailMovieData.release_date?.split('-')[0],
                    posterUrl: `https://image.tmdb.org/t/p/w500${detailMovieData.poster_path}`,
                    bannerUrl: `https://image.tmdb.org/t/p/w500${detailMovieData.backdrop_path}`,
                    overview: detailMovieData.overview,
                    genres: detailMovieData.genres.map((genre: { name: string; }) => genre.name),
                    voteAverage: detailMovieData.vote_average,
                    release_date: detailMovieData.release_date,
                    runtime: detailMovieData.runtime,
                    tagline: detailMovieData.tagline,
                };
                setDetailMovie(formattedMovie);
            } catch (error) {
                console.error('Failed to fetch movie details:', error);
            } finally {
                setLoading(false);
            }
        };

        const loadRecomMovies = async () => {
            setLoadingRecom(true);
            try {
                const recomMoviesData = await fetchRecommendationMovie({ language: 'en-US', page: 1, id: id });
        
                const formatMovies = (movies: any[]) =>
                    movies.map((movie: { id: number; title: string; release_date: string; poster_path: string }) => ({
                        id: movie.id,
                        title: movie.title,
                        year: movie.release_date?.split('-')[0],
                        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    }));
                    setRecomMovies(formatMovies(recomMoviesData));
            } catch (error) {
                console.error('Failed to fetch movies:', error);
            } finally {
                setLoadingRecom(false);
            }
        };
        
        loadRecomMovies();
        loadDetailMovie();
    }, [id])
    return(
        <div className="bg-black min-h-screen ">
            <div className="mx-auto px-2 py-0 ">
            {loading ? (
                <div className="text-white text-center py-20">Loading...</div>
            ) : (
            <>
                <BannerMovie movie={detailMovie}/>
            </>
            )}
                <div className="container mx-auto px-2 py-0 ">
                    {loadingRecom ? (
                        <div className="text-white text-center py-20">Loading...</div>
                    ) : (
                        <>
                            <HorizontalScrollsection title="Recommendations" movies={recomMovies}/>
                        </>
                    )} 
                
                </div>
                
            </div>
        </div>
    )
}

export default Detail;