const rp = require('request-promise-native');
async function fetchMovie(item) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`;
  const res = await rp(url);
  return res;
}

(async () => {
  let movies = [{
    doubanId: 34451842,
    title: '再见，将来',
    rate: '',
    poster:
      'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2561447303.jpg'
  },
  {
    doubanId: 34458930,
    title: '美好夏日',
    rate: '',
    poster:
      'https://img3.doubanio.com/f/movie/30c6263b6db26d055cbbe73fe653e29014142ea3/pics/movie/movie_default_large.png'
  }];
  movies.map(async movie =>{
    let movieData = await fetchMovie(movie);
    try{
      movieData = JSON.parse(movieData);
      console.log(movieData.tags);
    }catch(err){
      console.log(err);
    }
  })
})()