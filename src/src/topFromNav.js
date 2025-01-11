import { displayresults } from './displayResults.js';

import './app.js';



let genres = ["Animation","Action","Comedy","Drama", "Fantasy","Romance","Scifi","Thriller"]

function displayGenres(genres){

    let topGenres = document.getElementById("genresDropdown");

    for( let i = 0; i < genres.length; i++){
        topGenres.innerHTML += `<a href="#" class="dropdown-item" id="${genres[i]}">${genres[i]}</a>`;
        
    }
   
    
    for (let i = 0; i < genres.length; i++) {
        const genreElement = document.getElementById(genres[i]);
        genreElement.addEventListener('click', () => {
            fetchTopGenres(genres[i].toLowerCase());
        });
    }
}

displayGenres(genres);


async function  fetchTopGenres(genre){

    document.getElementById("startBtnContainer").style.display = 'none';

    const url = `https://streaming-availability.p.rapidapi.com/shows/search/filters?country=us&genres=${genre}&order_direction=desc&order_by=original_title&show_original_language=en&genres_relation=or&output_language=en`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '4efa484411mshefbd552124a8708p130c7cjsndafb785c6208',
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


function movieEngineNav(){
    
    let movieEngine =  document.getElementById("engineButton");
    movieEngine.addEventListener('click', () => {

        document.getElementById("coverText").style.display = 'block';
        document.getElementById("startBtnContainer").style.display = 'block';
        document.getElementById("startquesContainer").style.display = 'none';
        document.getElementById("resultsContainer").style.display = 'none';
        document.getElementById("movieMainPage").style.display = 'none';
    });

}
