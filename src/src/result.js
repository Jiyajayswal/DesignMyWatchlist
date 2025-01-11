
shows.forEach((show) => {

    let streamingPlatforms = '';
    let streamIcons = '';
    const uniqueServices = new Set();
    for (let i = 0; i < show.streamingOptions.us.length; i++) {
        const serviceName = show.streamingOptions.us[i].service.imageSet.lightThemeImage;
        if (!uniqueServices.has(serviceName)) {
            uniqueServices.add(serviceName);
            streamingPlatforms +=  `<img src="${serviceName}" class="icon mx-3" width='50px' height = auto>`;
        }
    }

    let year_display = '';
      if(show.showType === 'series'){
                year_display += `${show.firstAirYear}`
            }else if(show.showType === 'movie'){
                year_display+= `${show.releaseYear}`
            }
        
let isStreamingAppsMatch = () => {
    return show.streamingOptions.ca.some(option =>
        streamingApps.some(app =>
            option.service.toLowerCase() === app.toLowerCase()
        )
    );
};  



let isContentTypeMatch = () => {
    return contentType.some(type => type.toLowerCase() === show.showType.toLowerCase());
};


  
let isGenreMatch = () => {
    return show.genres.some(option =>
        genres.some(userGenre =>
            option.id.toLowerCase() === userGenre.toLowerCase()
        )
    );
};


 if (isStreamingAppsMatch && isContentTypeMatch && isGenreMatch) {
     console.log(show);
     resultsContainer.innerHTML += ` 
     <div class="row justify-content-center">
        <div class="col-12 col-md-7"> 
             
    <div class="card p-3 mb-5 border">
    <div class="row">

        <div class="col-12 col-md-5">
            <img src="${show.imageSet.verticalPoster.w720}" alt="Movie Poster" class="responsive" style="width: 100%; height: auto;">
        </div>       

        <div class="col-12 col-md-7 py-3 px-4">

            <span>
                <i class="fa fa-battery-full" aria-hidden="true"></i>
                <i class="fa fa-headphones" aria-hidden="true"></i>
            </span>
         
            <h5 class="small font-weight-bold my-2">${year_display} ${show.showType}</h5>  
            <h2 class="mb-3">${show.title}</h2>

            <p> ${show.overview}</p> 
            <div class="d-flex mb-3">
            <button class="btn">Rating: ${show.rating}</button>
            <button class="btn mr-3">${streamingPlatforms}</button>
            </div>
          </div>
                </div>
                </div>
        </div> 
        </div>  
        </div>
        </div>`;
        
 }
});


if (resultsContainer.innerHTML === `<h2 class="title text-center">Recommended for you</h2>`) {
    resultsContainer.innerHTML += `<p>No results match your preferences. Please try again with different options.</p>`;
}







 