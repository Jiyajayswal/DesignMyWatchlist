
import { fetchresults } from './displayResults.js';

export let userAnswers = {};

// export let coverText = `
// <div class="static-slider3">
//   <div class="container">
      
//       <div class="row justify-content-center text-light">
        
//           <div class="col-md-8 align-self-center text-center text-light">
//               <h1 class="title text-light">Can't find a movie to watch? </h1>
//                  <h5 class="text-light"><b class="font-weight-bold text-light">You're at the right place, answer a few questions and lets us find you something to watch</b>
//                   <br>like a 
//                   <span class="text-success-gradiant font-weight-bold typewrite" data-period="2000" data-type='[ "Dark tv comedies" , "A funny sitcom", "a true crime documentary", "anything with The Rock in it" ]'></span>
//               </h5>
//                             <button id="startButton" class="btn btn-success-gradiant btn-md text-white border-0 mt-3">
//                 <span>Start now</span></button>
//                </div>    
//       </div>
//   </div>
// </div>
// `;


const startquesContainer = document.getElementById('startquesContainer');
startquesContainer.style.display = 'none';

// displayResultsFunc()
//     .then(results => {
//         console.log(results);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

 document.addEventListener('DOMContentLoaded', () => {
    
  

    let currentIndex = 0;

   document.getElementById("startBtnContainer").innerHTML = `
            <div class="static-slider3">
            <div class="container">
                
                <div class="row justify-content-center text-light">
                    
                    <div class="col-md-8 align-self-center text-center text-light">
                        <h1 class="title text-light">Can't find a movie to watch? </h1>
                            <h5 class="text-light"><b class="font-weight-bold text-light">You're at the right place, answer a few questions and lets us find you something to watch</b>
                            <br>like a 
                            <span class="text-success-gradiant font-weight-bold typewrite" data-period="2000" data-type='[ "Dark tv comedies" , "A funny sitcom", "a true crime documentary", "anything with The Rock in it" ]'></span>
                        </h5>
                                        <button id="startButton" class="btn btn-success-gradiant btn-md text-white border-0 mt-3">
                            <span>Start now</span></button>
                        </div>    
                </div>
            </div>
            </div>
            `;


    // const container = document.body; // Or choose a specific element to append the cover text
    // container.insertAdjacentHTML('beforeend', coverText); // Add coverText to the DOM
    let startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => questionLayout());
// if (startButton) {
//     startButton.addEventListener('click', () => {
//         console.log("Start button clicked!");
//         questionLayout();
//     });
// } else {
//     console.error("Start button not found!");
// }

    function questionLayout() {

        startquesContainer.style.display = 'block';
        const startEngineContainer = document.getElementById('startBtnContainer');

        // Hide the container by setting its display to 'none'
        startEngineContainer.style.display = 'none';

        console.log("Question layout triggered!");


        fetch('questions.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                renderCarousel(data.questions);
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }


    // Function to render the carousel
    function renderCarousel(questions) {

        const carousel = document.getElementById('carousel');
        let carouselItems = '';

        let count = 0;
        // Generate the carousel items for each question
        questions.forEach((q, index) => {
            const isActive = index === 0 ? 'active' : ''; // Make the first item active

            let htmlContent = '';

            let count = 0;

            if (q.type === 'radio' || q.type === 'checkbox') {
                // Determine how to split the options into columns
                const optionsPerColumn = 8; // Number of options per column
                const totalOptions = q.options.length;
                const columns = Math.ceil(totalOptions / optionsPerColumn); // Number of columns needed
                
                // Create the HTML for options in columns
                for (let col = 0; col < columns; col++) {
                    htmlContent += `<div class="col-md-6">`; // Start a new column
        
                    // Loop through options for the current column
                    const start = col * optionsPerColumn;
                    const end = Math.min(start + optionsPerColumn, totalOptions);
                    for (let i = start; i < end; i++) {
                        const option = q.options[i];
                        
                        if(index === 3){
                            htmlContent += `
                            <div class="ans">
                                <label class="radio">
                                    <input type="${q.type}" name="${index}-${q.attribute}" value="${option.value}" id="${option.value}">
                                    <span class="w-100 text-left pl-3 ans redForHover">${option.label}</span>
                                </label>    
                            </div>`;
                        }else if(index === 4){
                            htmlContent += `
                            <div class="ans">
                                <label class="radio">
                                    <input type="${q.type}" name="${index}-${q.attribute}" value="${option}" id="${option}">
                                    <span class="w-100 text-left pl-3 ans redForHover d-block">${option}</span>
                                </label>    
                            </div>`;
                        }
                        else {
                            htmlContent += `
                            <div class="ans">
                                <label class="radio">
                                    <input type="${q.type}" name="${index}-${q.attribute}" value="${option}" id="${option}">
                                    <span class="w-100 text-left pl-3 ans redForHover">${option}</span>
                                </label>    
                            </div>`;
                        }
                    }
        
                    htmlContent += `</div>`; // Close the column
                }
            }

            carouselItems += `
           
                <div class="carousel-item ${isActive}">
                <div class="row">
                    <div class="card pt-4 mx-4 align-items-center container white-some-bg">
                    <h5 class="card-title text-light">${index + 1}. ${q.question}</h5>
                    
                    <div class="card-body w-75 justify-content-center">
                    <div class = "row">
                        ${htmlContent}
                    </div>
                    </div>
                    </div>
                </div>
                </div>
                `;
     
          
     });

        // Inject the carousel items into the carousel
        carousel.innerHTML = carouselItems;
        // //const prevBtn = document.getElementById('prevBtn');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        prevBtn.addEventListener('click', () => navigateCarousel(-1));
        nextBtn.addEventListener('click', () => navigateCarousel(1));
        nextBtn.disabled = true;
        
        // Show the appropriate question when Prev or Next is clicked

    function navigateCarousel(direction) {

        const items = document.querySelectorAll('.carousel-item');
        const currentInputs = items[currentIndex].querySelectorAll('input');
        
            // Save user responses
        currentInputs.forEach(input => {
            if (input.type === 'radio' || input.type === 'checkbox') {
                if (input.checked) {

                   
                    //const questionAttribute = input.getAttribute('data-attribute') || `question-${currentIndex}`;
                    userAnswers[`Q${currentIndex}`] = Array.from(currentInputs)
                    .filter(i => i.checked)
                    .map(i => i.value);
                    console.log("check user answers");
                    console.log(userAnswers);
                    
                }
            } else if (input.type === 'text') {
                    userAnswers[`question-${currentIndex}`] = input.value.trim();
                }
            });

        console.log(currentInputs);
        
        console.log(userAnswers);
        items[currentIndex].classList.remove('active');

            // Calculate the new index with wrapping
        currentIndex = (currentIndex + direction + items.length) % items.length;
        
        items[currentIndex].classList.add('active');

        
        validateInput(currentIndex);

        }
  

        function validateInput(index) {

            console.log(index);
            //nextBtn.disabled = true; // Disable the Next button initially
            if ( index === 0) {
                prevBtn.disabled = true;
            }else if(index === 5){
                
                document.getElementById('startquesContainer').innerHTML = `
                <div class="border d-flex align-items-center justify-content-center" style="height: 350px;">
                <div class="spinner">
                <div></div><div></div><div></div><div></div><div></div><div></div>
                <div></div><div></div><div></div><div></div><div></div> <div></div>
              </div></div>
              `
                return fetchresults();
            }
          
            else {
                prevBtn.disabled = false;
                prevBtn.style.display = 'block';
            }

            const currentItem = document.querySelectorAll('.carousel-item')[index];
            const inputs = currentItem.querySelectorAll('input');

            // Add event listeners to all inputs to detect user interaction
            const checkValidity = () => {
                return Array.from(inputs).some(input =>
                    input.type === 'text' ? input.value.trim() : input.checked
                );
            };

            // Initially set the Next button state based on input validity
            nextBtn.disabled = !checkValidity();
            inputs.forEach(input => {
                input.addEventListener('change', () => {
                    // If any input is checked or filled, enable the Next button
                    const isValid = Array.from(inputs).some(input => input.type === 'text' ? input.value.trim() : input.checked);
                    nextBtn.disabled = !isValid;
                });

                input.addEventListener('input', () => {
                    // Enable Next button if the text input has value
                    const isValid = Array.from(inputs).some(input => input.type === 'text' ? input.value.trim() : input.checked);
                    nextBtn.disabled = !isValid;
                });
            });
        
        }
        validateInput(currentIndex);
     
    //closing renderCarousel
    }
    


});

