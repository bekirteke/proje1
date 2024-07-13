import React from "react";
import HomeContainer from "@/containers/home";



async function getCategories() {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
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

  async function getTopRated() {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
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

  async function getPopular() {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
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

  const getSingleCategory = async(genreId) =>{
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`;
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