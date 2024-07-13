import React from "react";
import HomeContainer from "@/containers/home";

import { getCategories, getPopular, getSingleCategory, getTopRated } from "@/services/movie";



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