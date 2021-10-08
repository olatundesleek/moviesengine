document.addEventListener( 'DOMContentLoaded', function () {
    var main = new Splide( '.splide', {
      type       : 'fade',
      cover      : true,
      rewind     : false,
      pagination : false,
      fixedHeight : 550,
      width:"1000vw",
      heightRatio: 0.5,
    
    } );
  
    var thumbnails = new Splide( '#thumbnail-slider', {
      fixedWidth  : 100,
      fixedHeight : 60,
      gap         : 20,
      rewind      : true,
   
      autoplay    : true,
      cover       : true,
      isNavigation: true,
      pauseOnHover: true,
      pauseOnFocus: true,
      
      breakpoints : {
        600: {
          fixedWidth : 60,
          fixedHeight: 44,
        },
      },
    } );
  
    main.sync( thumbnails );
    main.mount();
    thumbnails.mount();
  } );

  let apiKey = "2b0f1e93168e7f090b4956334fcedbdd"
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((location)=>{
let lat = location.coords.latitude;
let long = location.coords.longitude
        console.log(long,lat);

let api = `https://api.darksky.net/forecast/${apiKey}/${lat},${long}`;

fetch(api).then((data)=>{
  return  data.json()
}).then((detail)=>{

    let loader = document.querySelector(".loader");
    console.log(detail);
let temp = detail.currently.temperature;
let location = detail.timezone;

temp = Math.floor((temp - 32) * 5/9);

console.log(temp,location);
let userLocation = document.querySelector(".user-location")
let userLocationTemp = document.querySelector(".user-location-temp")
let deg = document.querySelector(".deg");
loader.style.display = "none";
userLocation.textContent = location;
userLocationTemp.textContent = temp;
deg.style.display = "block";
})
    })}

    let newMoviesContainer = document.querySelector(".new-movies-container");
let newMovies = "https://imdb-api.com/en/API/ComingSoon/k_2pfeso55";

if (localStorage.getItem("comingsoon") == null) {
    fetch(newMovies).then((data)=>{
        return  data.json()
      }).then((res)=>{
          console.log(res.items);
       let fetchedNewMovies = res.items;
       localStorage.setItem("comingsoon",JSON.stringify(fetchedNewMovies))
      let theNewMovies = localStorage.getItem("comingsoon");
       theNewMovies = fetchedNewMovies.map((r)=>{
           return ` 
            <div class="newmovie">
           <div class="movie-img">
      <img class="movie-image" src=${r.image} />
           </div>
           <div class="movie-info">
      <h4>title: ${r.fullTitle}</h4>
      <p>genres: ${r.genres}</p>
      <p>duration: ${r.runtimestr}</p>
      <p>release date:${r.releaseState}</p>
      <p>stars: ${r.stars}</p>
      <p>${r.plot}</p>
           </div>
       </div>`
       })
       newMoviesContainer.innerHTML = `${theNewMovies}` 
      })
      console.log("a call was made");
}
else {

    let theNewMovies = JSON.parse(localStorage.getItem("comingsoon"));
    console.log(theNewMovies);
  let newMoviesFromStorage =  theNewMovies.map((r)=>{
        return ` 
         <div class="newmovie">
        <div class="movie-img">
   <img class="movie-image" src=${r.image} />
        </div>
        <div class="movie-info">
   <h4>title: ${r.fullTitle}</h4>
   <p>genres: ${r.genres}</p>
   <p>duration: ${r.runtimestr}</p>
   <p>release date:${r.releaseState}</p>
   <p>stars: ${r.stars}</p>
   <p>${r.plot}</p>
        </div>
    </div>`
    })
    newMoviesContainer.innerHTML = `${newMoviesFromStorage}` 
   }



