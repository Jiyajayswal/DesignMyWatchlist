import { displayresults } from './displayResults.js';
import { fetchresults } from './displayResults.js';

export function showLayout(show){
   

    console.log("Show Object:", show);

    if (!show || typeof show !== 'object') {
        console.error("Invalid or undefined show object");
        return;
    }
        
        document.getElementById("resultsContainer").style.display = "none";
       

        let showHtmlLayout =  document.getElementById("movieMainPage");
        showHtmlLayout.style.display = "block";

        let streamingPlatforms = '';
        let streamingAudios = '';
       
        const uniqueServices = new Set();
        const uniqueLinks = new Set();
        for (let i = 0; i < show.streamingOptions.us.length; i++) {
            const serviceName = show.streamingOptions.us[i].service.imageSet.lightThemeImage;
            const showLink = show.streamingOptions.us[i].link;
            if ((!uniqueServices.has(serviceName)) & (!uniqueLinks.has(showLink))) {
                uniqueServices.add(serviceName);
                uniqueLinks.has(showLink);
             
                streamingPlatforms += `
            <a href="${showLink}" class="streaming-box-link" target="_blank" rel="noopener noreferrer">
                <div class="streaming-box">
                    <img src="${serviceName}" class="streaming-icon mx-3" alt="Streaming Service Logo">
                </div>
            </a>`;
            
            }
        }


        let genreList = '';
        const uniqueGenre = new Set();
        for (let i = 0; i < show.genres.length; i++) {
            const genre = show.genres[i].name;
            if (!uniqueGenre .has(genre)) {
                uniqueGenre.add(genre);
                genreList +=  `<span class="badge badge-light m-2">${genre}</span>`;
            }
        }

        
        let directorList = '';
        if (!show.directors || show.directors.length === 0) {
            console.warn("No directors found for this show.");
            directorList = 'N/A';
        } else {
            const uniqueDirector = new Set();
            for (let i = 0; i < show.directors.length; i++) {
                const director = show.directors[i];
                if (!uniqueDirector.has(director)) {
                    uniqueDirector.add(director);
                    if(i >= 1){
                        directorList += ', ';
                    }
                    directorList += `${director}`;
                }
            }
        }
        
        let year_display = '';
          if(show.showType === 'series'){
                    year_display += `${show.firstAirYear}`
                }else if(show.showType === 'movie'){
                    year_display+= `${show.releaseYear}`
                } 

        showHtmlLayout.innerHTML = "";
       showHtmlLayout.innerHTML += `
       <div class="container">
       <a href="#resultsContainer" id="backToResults" ><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="white" class="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
        </svg></a>
       <div class="row text-light">
           <div class="col-md-5">
               <div class="project-info-box mt-0 text-light">
               <h6 class="font-weight-light text-capitalize tracking-wider">${year_display} ${show.showType}</h6>
               
                   <h1 class="font-weight-normal">${show.title}</h1>
                   <div>${genreList}</div>
                   
                   
                   <p class="mb-0 text-light truncate-overflow">${show.overview}</p>
                  
               </div>
   
               <div class="project-info-box text-light">
                   <p class="text-light"><b class="mr-3">Directors:</b><i class="text-end">${directorList}</i></p>
                   
                   <p class="text-light"><b class="mr-3">Rating:</b>${show.rating}</p>
                   
               </div>
   
               <div class="project-info-box mt-0 mb-0">
                   
               </div>
           </div>
   
           <div class="col-md-7">
               <img src="${show.imageSet.horizontalPoster.w720}" alt="project-image" class="rounded">
               <div class="project-info-box text-light">
                    <b class="m-2 text-capitalize">Click here to watch the ${show.showType}</i> on </b>
                    <div class="d-flex flex-wrap justify-content-start">
                        ${streamingPlatforms}
                    </div>                      
               </div>
           </div>
       </div>
   </div>
       `;

    // To add when ready
    //    <p class="mb-0">
    //                    <span class="fw-bold mr-10 va-middle hide-mobile text-light">Share:</span>
    //                    <a href="#x" class="btn btn-xs btn-facebook btn-circle btn-icon mr-5 mb-0"><i class="fab fa-facebook-f"></i></a>
    //                    <a href="#x" class="btn btn-xs btn-twitter btn-circle btn-icon mr-5 mb-0"><i class="fab fa-twitter"></i></a>
    //                    <a href="#x" class="btn btn-xs btn-pinterest btn-circle btn-icon mr-5 mb-0"><i class="fab fa-pinterest"></i></a>
    //                    <a href="#x" class="btn btn-xs btn-linkedin btn-circle btn-icon mr-5 mb-0"><i class="fab fa-linkedin-in"></i></a>
    //                </p>

       const backToResults = document.getElementById("backToResults");
       if (backToResults) {
           backToResults.addEventListener('click', () => {
               document.getElementById("movieMainPage").style.display = "none";
               document.getElementById("resultsContainer").style.display = "block";
           });
       }

       document.addEventListener('DOMContentLoaded', () => {
        const overviewText = document.getElementById('overview-text');
        const toggleButton = document.getElementById('toggle-button');
    
        toggleButton.addEventListener('click', () => {
            const isExpanded = overviewText.classList.toggle('expanded');
            toggleButton.textContent = isExpanded ? 'Less' : 'More';
        });
    });
}



