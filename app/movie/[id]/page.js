import React from 'react'
import { MovieContainer } from '@/containers/movie'
import { notFound } from 'next/navigation';

import { fetchMovieApi } from '@/services/movie';

const getMovie = async (movieId) => {
  return fetchMovieApi(`https://api.themoviedb.org/3/movie/${movieId}`);
  }


async function MoviePage( {params, searchParams}) {


    const movieDetail = await getMovie(params.id);
    
    if (!movieDetail) {
        notFound();
    }

    if(searchParams.error === "true") {
        throw new Error("Error happened");
    }
  
    return (
    
    <MovieContainer movie = {movieDetail} />
  )
}

export default MoviePage