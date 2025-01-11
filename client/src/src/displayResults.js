import {userAnswers} from './app.js';
import './app.js';
import { API_KEY } from './config.js';
import './movieMain.js';

//import { renderCarousel } from './app.js';
import { showLayout } from './movieMain.js';

let currentShowIndex = 0;  // To keep track of which set of shows to display



export function displayresults(shows) {
    startquesContainer.style.display = 'none';

    let resultsContainer = document.getElementById("resultsContainer");
    //resultsContainer.innerHTML = `<h5 class="title text-center font-italic mb-4 text-light">Recommended for you</h5>`;

    
    let showsToDisplay = shows.slice(currentShowIndex, currentShowIndex + 4);
    // Create a function to display shows based on the current index
   

    // Display the first set of shows
    displayShows(showsToDisplay);

    if (shows.length > 4){
    // Create "Give another recommendation" button
    const recommendationBtn = document.createElement('button');
    
    recommendationBtn.id = 'recommendationBtn';
    //recommendationBtn.className = 'btn mx-auto my-4 btn-light';
    recommendationBtn.className = 'btn btn-outline-light mx-auto d-block';
    recommendationBtn.style.marginBottom = '20px';
    recommendationBtn.innerText = 'Load all recommendations';

    resultsContainer.appendChild(recommendationBtn);

    // const recommendationBtn = document.getElementById('recommendationBtn');
    // recommendationBtn.innerHTML = ` <button id="recomendButton" class="border-2 border-purple-900 p-2 px-10 rounded text-purple-900 uppercase hover:shadow hover:bg-purple-900 hover:text-white">Load More Recommendations</button>`
    recommendationBtn.addEventListener('click', () => {
        document.getElementById('recommendationBtn').style.display = 'none'; 
        //currentShowIndex += 4;  // Increase the index to load the next set of 4 shows
       
        showsToDisplay = shows.slice(currentShowIndex, shows.length);
        displayShows(showsToDisplay); 
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });

}else if(shows.length === 0) {
    resultsContainer.innerHTML += `<h6 class="text-light text-center my-4">No results match your preferences. Please click on Reset and try again with different options.</h6>`;
    
}
    
    

    if (currentShowIndex + 4 >= shows.length) {
        document.getElementById('recommendationBtn').style.display = 'none';  // Hide the button when all shows are displayed
    //    recommendationBtn.style.display = 'none';
    }

    // If no shows are found, display a message
    if (resultsContainer.innerHTML === `<div class="d-grid gap-2 d-md-flex justify-content-md-end mr-4">
    <a href="${document.referrer}"><button class="btn mr-5 btn-light" type="button">Reset</button></a>
    </div>
  <h5 class="title text-center font-italic text-light">Recommended for you</h5>`) {
        resultsContainer.innerHTML += `<h6 class="text-light text-center">No results match your preferences. Please try again with different options.</h6>`;
    }
}


export function displayShows(showsToDisplay) {
        
    if (currentShowIndex === 0) {
        resultsContainer.innerHTML = `
        <div class="d-grid gap-2 d-md-flex justify-content-md-end mr-4">
        <a href="${document.referrer}"><button class="btn mr-5 btn-light" type="button">Reset</button></a>
        </div>
      <h5 class="title text-center font-italic text-light">Recommended for you</h5> `; 
    
    }
    
   
   
    let currentRow = '';
    
    showsToDisplay.forEach((show, index) => {
        let streamingPlatforms = '';
        const uniqueServices = new Set();
        for (let i = 0; i < show.streamingOptions.us.length; i++) {
            const serviceName = show.streamingOptions.us[i].service.imageSet.lightThemeImage;
            if (!uniqueServices.has(serviceName)) {
                uniqueServices.add(serviceName);
               streamingPlatforms += `<img src="${serviceName}" class="icon mx-3" width='50px' height="auto">`;
            }
        }

        let genreList = '';
        const uniqueGenre = new Set();
        for (let i = 0; i < show.genres.length; i++) {
            const genre = show.genres[i].name;
            if (!uniqueGenre.has(genre)) {
                uniqueGenre.add(genre);
                genreList += `<span class="badge badge-light m-2">${genre}</span></h6>`;
            }
        }

        let year_display = '';
        if (show.showType === 'series') {
            year_display += `${show.firstAirYear}`;
        } else if (show.showType === 'movie') {
            year_display += `${show.releaseYear}`;
        }

        if (index % 4 === 0) {
            currentRow = document.createElement('div');
            currentRow.className = 'row justify-content-center mx-3 px-3 py-4';
            resultsContainer.appendChild(currentRow);
        }

        const cardCol = document.createElement('div');
        cardCol.className = 'col-12 col-md-3 d-flex';  // Two cards per row

        cardCol.innerHTML = `<div class="card border-dark w-100 mx-1 my-2 p-3 d-flex flex-column white-some-bg" style="height: auto">
            <img src="${show.imageSet.verticalPoster.w720}" alt="Movie Poster" class="responsive bg-light" style="width: 100%; height: 100%;">
            <h4 class="mt-3 text-light">${show.title}</h4>
            <div class="d-flex mb-2">${genreList}</div>
          
            <div class="mt-auto text-right">
            <a href="#movieMainPage">
            <button type="button" id="viewMoreButton-${currentShowIndex + index}" class="btn btn-outline-light rounded-pill btn-sm p-2 tracking-widest fw-light">View
            <i class="fa fa-angle-right ml-2"></i>
            </button></a>
        </div>
       
      </div>    
        </div> 
        </div>  
        </div>
        </div>`;

        currentRow.appendChild(cardCol);

        let viewMoreButton = document.getElementById(`viewMoreButton-${currentShowIndex + index}`);
        viewMoreButton.addEventListener('click', () => showLayout(show));  

    });

}


export async function fetchresults() {
    const { Q0 = [], Q1 = [], Q2 = [], Q3 = [], Q4 = [] } = userAnswers;

    const streamServices = Q0.length ? Q0.join(',').toLowerCase() : '';
    const showType = Q1.length ? Q1[0].toLowerCase() : '';
    const genres = Q2.length ? Q2.join(',').toLowerCase() : '';

    const currentYear = new Date().getFullYear();
    const orderBasis = 'rating';
    const orderDirection = 'desc'
    
    let findMinYear = ()=>{
        if(Q4[0].includes('3')){
            return currentYear - 3;
        }else if(Q4[0].includes('5')){
            return currentYear - 5;
        }
        else if(Q4[0].includes('10')){
            return currentYear - 10;
        }
        else if(Q4[0].includes('20')){
            return 1900;
        }else{
            return 1900;
        }
    }

    const language = Q3.length? Q3.join(',').toLowerCase() : '';

    let minYear = findMinYear();
    

    console.log("Stream services:", streamServices);
    console.log("Show type:", showType);
    console.log("Genres:", genres);
    const url = `https://streaming-availability.p.rapidapi.com/shows/search/filters?country=us&year_max=${currentYear}&series_granularity=show&genres=${genres}&order_direction=${orderDirection}&order_by=${orderBasis}&year_min=${minYear}&show_original_language=${language}&genres_relation=or&catalogs=${streamServices}&rating_max=100&show_type=${showType}&rating_min=0`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json(); // Assuming the API returns JSON
        console.log(result);
        const shows = result.shows || [];
     
            // Display results
        displayresults(shows);
        console.log(shows);     
    } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    }

