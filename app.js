const searchBtn = document.querySelector('.btn-search')
const inputEl = document.querySelector('input')
const mainContainerEl = document.querySelector('.main-container')
const filmContainerEl = document.querySelector('.film-container')

let watchList = []



searchBtn.addEventListener('click', () => {
    mainContainerEl.innerHTML = ''
    fetch(`http://www.omdbapi.com/?s=${inputEl.value}&apikey=855731ad`)
        .then(res => res.json())
        .then(data => {
            inputEl.value = ''
            if (data.Response === 'True') {
                filmContainerEl.style.display = 'none'
                for (let movie of data.Search) {
                    fetch(`http://www.omdbapi.com/?t=${movie.Title}&apikey=855731ad`)
                    .then(res => res.json())
                    .then(data => {
                        const {Poster, Title, Runtime, Genre, Plot, imdbRating, imdbID} = data

                        const movieHtml = `
                        <div class="movie">
                            <img src="${Poster}" alt="">
                            <div class="movie-text">
                                <h4>${Title} <span class="star-text"><i class="fa-solid fa-star star"></i> ${imdbRating}</span></h4>
                                <p>${Runtime} <span class="movie-types">${Genre}</span>
                                <span class="watchlist-text"><button class="btn-watchlist" value="${imdbID}"><i class="fa-solid fa-circle-plus watchlist"></i>Watchlist</button></span>
                                </p>
                                <p class="movie-desc">${Plot}</p>
                            </div>
                        </div>
                        `
                        mainContainerEl.innerHTML += movieHtml
                    
                        const watchListBtns = document.querySelectorAll('.btn-watchlist')

                        watchListBtns.forEach(btn => {
                            btn.addEventListener('click', () => {
                                console.log(typeof(btn.value))
                                if (localStorage.getItem(btn.value) === null) {
                                    console.log(`${btn.value} added to watchlist!`)
                                    fetch(`http://www.omdbapi.com/?i=${btn.value}&apikey=855731ad`)
                                        .then(res => res.json())
                                        .then(data => {
                                            const {Poster, Title, Runtime, Genre, Plot, imdbRating, imdbID} = data
                                            localStorage.setItem(`${imdbID}`, `${Title}`)
                                        })
                                } else {
                                    console.log('Movie is already added!')
                                }
                            })
                        })
                        
                        
                    })
                }
            } else {
                filmContainerEl.innerHTML = `
                <p class="no-data-text">Unable to find what you're looking for. Please try another search.</p>
                `
                filmContainerEl.style.display = 'flex'
            }
        })
    console.log(watchList)   
})