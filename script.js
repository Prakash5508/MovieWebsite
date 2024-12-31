const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 7) {
        return 'green';
    } else if (vote >= 6.5) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
});

// Wait for the DOM to fully load before accessing elements
document.addEventListener('DOMContentLoaded', () => {
    // Select the Load More button
    const loadMoreButton = document.getElementById('loadMore');

    loadMoreButton.addEventListener('click', function() {
        loadMoreContent();

    });
});

// Function to load more content

let currentPage = 1; 

function loadMoreContent() {
    console.log("Loading more content...");
    currentPage += 1; // Increment the page number
    console.log("New page:", currentPage);
    

    // Fetch the next page of movies using the updated API URL
    getMovies(`${API_URL}&page=${currentPage}`); 
}
// for prevew button
document.addEventListener('DOMContentLoaded',() => {
    // slelect the prevew button
    const prevewButton = document.getElementById('prevew');
    prevewButton.addEventListener('click', function(){
        prevewContent();

    });
});
// function for prevew content
function prevewContent(){
    if(currentPage === 1){
        return;
    }
    currentPage -= 1;
    console.log("New page:", currentPage);
    getMovies(`${API_URL}&page=${currentPage}`);
    
}


// for contact button
document.addEventListener('DOMContentLoaded',() => {
    // select the contact button
    const contactButton = document.getElementById('contact');
    contactButton.addEventListener('click', function(){
        contactContent();
    });
});

// function for contact content
function contactContent(){
    console.log("Contact content...");
    window.location.href = 'contact.html';
}























