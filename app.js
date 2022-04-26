const searchBtn = document.querySelector('.btn-search')
const inputEl = document.querySelector('input')
const mainContainerEl = document.querySelector('.main-container')
const filmContainerEl = document.querySelector('.film-container')
const watchListContainerEl = document.querySelector('.watchlist-container')

let addedToWatchlist = false;

const addToWatchlist = () => {
    if (addedToWatchlist) {

    }
}

const clickHandler = () => console.log('clickkkkkk');

searchBtn.addEventListener('click', () => {
    mainContainerEl.innerHTML = ''
    fetch(`http://www.omdbapi.com/?s=${inputEl.value}&apikey=855731ad`)
        .then(res => res.json())
        .then(data => {
            let results = []
            inputEl.value = ''
            console.log(data.Response)
            if (data.Response === 'True') {
                filmContainerEl.style.display = 'none'
                for (let movie of data.Search) {
                    fetch(`http://www.omdbapi.com/?t=${movie.Title}&apikey=855731ad`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        results.push(data)
                        mainContainerEl.innerHTML += `
                        <div class="movie">
                            <img src="${data.Poster}" alt="">
                            <div class="movie-text">
                                <h4>${data.Title} <span class="star-text"><i class="fa-solid fa-star star"></i> ${data.imdbRating}</span></h4>
                                <p>${data.Runtime} <span class="movie-types">${data.Genre}</span>
                                <span class="watchlist-text"><button class="btn-watchlist"><i class="fa-solid fa-circle-plus watchlist"></i>Watchlist</button></span>
                                </p>
                                <p class="movie-desc">${data.Plot}</p>
                            </div>
                        </div>
                        `
                        console.log(results)
                    })
                }
            } else {
                filmContainerEl.innerHTML = `
                <p class="no-data-text">Unable to find what you're looking for. Please try another search.</p>
                `
                filmContainerEl.style.display = 'flex'
            }
        })
})



