//default movieGenres
let movieGenre = {
  happy: 35,
  sad: 18,
  romantic: 10749,
  mad: 53,
  excited: 12,
  dreamy: 14,
};


const randomNumberMad = Math.floor(Math.random() * 5);
const randomNumberhappy = Math.floor(Math.random() * 2);
const mad = [53,28,27,80,10752];
const happy = [35,10751];

//randomizes genres for mad and happy
movieGenre.happy = happy[randomNumberhappy];
movieGenre.mad = mad[randomNumberMad];

module.exports = {
  movieGenre
};



////////////////////////////////////
//      Genre to ID TMDB API      //
//  Action   :         28         //    
//  Adventure:         12         //
//  Comedy   :         35         //
//  Crime    :         80         //
//  Drama    :         18         //
//  Family   :         10751      // 
//  Fantasy  :         14         //
//  Horror   :         27         //  
//  Romance  :         10749      //  
//  Thriller :         53         //  
//  War      :         10752      //
////////////////////////////////////