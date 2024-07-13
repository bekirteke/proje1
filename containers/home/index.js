import React from 'react';


import { FeaturedMovie } from '@/components/featured-movie';
import { Categories } from '@/components/categories';
import { MoviesSection } from '@/components/movies-section';

function HomeContainer({ selectedCategory, categories=[], topRated=[], popular=[] }) {
  const genre = categories.find((genre) => `${genre.id}` === selectedCategory.id);

  return (
    <div>
      <FeaturedMovie movie={topRated?.[0]} />
      <Categories categories={categories.slice(0, 5)} />

      {selectedCategory.movies.length > 0 && genre && (
        <MoviesSection 
          title={genre.name} 
          movies={selectedCategory.movies} 
        />
      )}

      <MoviesSection 
        title="Popular Films" 
        movies={topRated.slice(1, 7)} 
      />
      <MoviesSection 
        title="Your Favorites" 
        movies={popular.slice(7, 13)} 
      />
    </div>
  );
}

export default HomeContainer;
