let watchlist = []

const moviesSection = document.getElementById("movies-section")
const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")

searchButton.addEventListener("click", async () => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=ec2395f0&s=${searchInput.value}`)
        const data = await response.json()
        let filmsArray = []
        for (let film of data.Search){
            filmsArray.push(film.imdbID)
        }
        renderFilms(filmsArray, moviesSection)
    } catch (error) {
        return moviesSection.innerHTML = `<p class="placeholder">Unable to find what you're looking for. Please try another search.</p>`
    }
    searchInput.value = ""
})

moviesSection.addEventListener("click", e => {
    if (e.target.id){
        watchlist.push(e.target.id)
        watchlist = JSON.stringify(watchlist)
        localStorage.setItem("watchlist", watchlist)
        watchlist = JSON.parse(watchlist)
    }
})

const renderFilms = async (array) => {
    let filmsString = ``
    console.log(array)
    for (let filmImdb of array) {
        const response = await fetch(`https://www.omdbapi.com/?apikey=ec2395f0&i=${filmImdb}`)
        const data = await response.json()
        const {Poster, Title, imdbRating, Runtime, Genre, imdbID, Plot} = data
        filmsString += `
             <section class="movie">
                <img class="poster" src="${Poster}">
                <div>
                    <div class="title">
                        <h2>${Title}</h2>
                        <img class="star" src="/images/star-icon.png">
                        <p class="rating">${imdbRating}</p>
                    </div>
                    <div class="information">
                        <p>${Runtime}</p>
                        <p class="genre">${Genre}</p>
                        <button id="${imdbID}" class="add">Watchlist</button>
                    </div>
                    <p class="plot">${Plot}</p>
                </div>
            </section>`
        moviesSection.innerHTML = filmsString
    }
}