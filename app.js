const searchBtn = document.querySelector('.btn')
const inputEl = document.querySelector('input')
const mainContainerEl = document.querySelector('.main-container')
const filmContainerEl = document.querySelector('.film-container')

searchBtn.addEventListener('click', () => {
    mainContainerEl.innerHTML = ''
    fetch(`http://www.omdbapi.com/?s=${inputEl.value}&apikey=855731ad`)
        .then(res => res.json())
        .then(data => {
            inputEl.value = ''
            filmContainerEl.style.display = 'none'
            for (let movie of data.Search) {
                fetch(`http://www.omdbapi.com/?t=${movie.Title}&apikey=855731ad`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    mainContainerEl.innerHTML += `
                    <div class="movie">
                        <img src="${data.Poster}" alt="">
                        <div class="movie-text">
                            <h4>${data.Title} <span class="star-text"><i class="fa-solid fa-star star"></i> ${data.imdbRating}</span></h4>
                            <p>${data.Runtime} <span class="movie-types">${data.Genre}</span><span class="watchlist-text"><i class="fa-solid fa-circle-plus watchlist"></i>Watchlist</span></p>
                            <p class="movie-desc">${data.Plot}</p>
                        </div>
                    </div>
                    `
                })
            }
        })
})