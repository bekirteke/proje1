import React from "react";
import HomeContainer from "@/containers/home";

import { fetchMovieApi } from "@/services/movie";

async function getCategories() {
    return fetchMovieApi('https://api.themoviedb.org/3/genre/movie/list');
  }

  async function getTopRated() {
    return fetchMovieApi('https://api.themoviedb.org/3/movie/top_rated');

  }

  async function getPopular() {
    return fetchMovieApi('https://api.themoviedb.org/3/movie/popular');
  }

  const getSingleCategory = async(genreId) =>{
    return fetchMovieApi(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`);
  }


async function Home({ params }) {
    
    const categoriesPromise = getCategories();
    const topRatedPromise = getTopRated();
    const popularPromise = getPopular();

    const [{genres: categories}, {results: topRated}, {results: popular}] = await Promise.all([categoriesPromise, topRatedPromise, popularPromise]);
    //console.log(categories);
    //console.log(topRated);

    let selectedCategory;

    if (params.category?.length > 0) {
        const { results } = await getSingleCategory(params.category[0]);
        selectedCategory = results;
        //console.log(selectedCategory);
    }
    

    return (
        <HomeContainer 
        categories={categories}
        topRated={topRated}
        popular={popular}
            selectedCategory={{
                id: params.category?.[0] ?? "",
                movies: selectedCategory ? selectedCategory.slice(0, 7) : [],
            }} 
        />
    );
}

export default Home;