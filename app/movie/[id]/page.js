import React from 'react'
import { MovieContainer } from '@/containers/movie'
import { notFound } from 'next/navigation';

const getMovie = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
      }
    };
  
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      return json;
    } catch (err) {
      console.error('error:' + err);
      return null;
    }
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