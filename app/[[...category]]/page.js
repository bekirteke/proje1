import React from "react";
import HomeContainer from "@/containers/home";
import Movies from "@/mocks/movies.json";


async function getCategories() {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGFhZDViZWQ0ZGIxY2NiMzBhMjg0ODJkNzZkY2RiNyIsIm5iZiI6MTcyMDc5NDg2OS4wNTEyNiwic3ViIjoiNjY5MTNlYTNiMGNkODM2NDFiMjNhMDZkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.msmUkyJIPP4r0uN28_uOVLspSClpYQokbg5Ngsaz7gg'
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
    
    const getGategories = getCategories();

    const [{genres: categories}] = await Promise.all([getGategories]);
    //console.log(categories);

    let selectedCategory;

    if (params.category?.length > 0) {
        selectedCategory = true;
    }

    return (
        <HomeContainer 
        categories={categories}
            selectedCategory={{
                id: params.category?.[0] ?? "",
                movies: selectedCategory ? Movies.results.slice(0, 7) : [],
            }} 
        />
    );
}

export default Home;
