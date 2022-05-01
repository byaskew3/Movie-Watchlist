if (localStorage.length > 0) {
    const watchlistContainerEl = document.querySelector('#watchlist-container')
    watchlistContainerEl.innerHTML = ''
    watchlistContainerEl.style.display = 'block'
    for (let i = 0; i < localStorage.length; i++){
        const movieId = localStorage.getItem(localStorage.key(i));
        fetch(`https://www.omdbapi.com/?t=${movieId}&apikey=855731ad`)
        .then(res => res.json())
        .then(data => {
            const {Poster, Title, Runtime, Genre, Plot, imdbRating, imdbID} = data
            const movieHtml = `
                <div class="movie">
                    <img src="${Poster}" alt="">
                    <div class="movie-text">
                        <h4>${Title} <span class="star-text"><i class="fa-solid fa-star star"></i> ${imdbRating}</span></h4>
                        <p>${Runtime} <span class="movie-types">${Genre}</span>
                        </p>
                        <p class="movie-desc">${Plot}</p>
                    </div>
                </div>
                `
            watchlistContainerEl.innerHTML += movieHtml
        })
    }

}
