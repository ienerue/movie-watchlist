let watchlist = localStorage.getItem("watchlist")
watchlist = JSON.parse(watchlist)

const moviesSection = document.getElementById("movies-section")
const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")

searchButton.addEventListener("click", function(){
    fetch(`https://www.omdbapi.com/?apikey=ec2395f0&s=${searchInput.value}`)
        .then(response => response.json())
        .then(data => {
            let filmsArray = []
            for (let film of data.Search){
                filmsArray.push(film.imdbID)
            }
            renderFilms(filmsArray, moviesSection)
        })
        .catch(error => {
            moviesSection.innerHTML = `<p class="placeholder">Unable to find what you're looking for. Please try another search.</p>`
        })
    searchInput.value = ""
})

moviesSection.addEventListener("click", function(e){
    if (e.target.id){
        watchlist.push(e.target.id)
        watchlist = JSON.stringify(watchlist)
        localStorage.setItem("watchlist", watchlist)
        watchlist = JSON.parse(watchlist)
    }
})

function renderFilms(array) {
    let filmsString = ``
    console.log(array)
    for (let filmImdb of array) {
        fetch(`https://www.omdbapi.com/?apikey=ec2395f0&i=${filmImdb}`)
            .then(response => response.json())
            .then(data => {
                filmsString += `
                    <section class="movie">
                        <img class="poster" src="${data.Poster}">
                        <div>
                            <div class="title">
                                <h2>${data.Title}</h2>
                                <img class="star" src="/images/star-icon.png">
                                <p class="rating">${data.imdbRating}</p>
                            </div>
                            <div class="information">
                                <p>${data.Runtime}</p>
                                <p class="genre">${data.Genre}</p>
                                <button id="${data.imdbID}" class="add">Watchlist</button>
                            </div>
                            <p class="plot">${data.Plot}</p>
                        </div>
                    </section>`
                moviesSection.innerHTML = filmsString
            })
    }
}

