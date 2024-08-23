const watchlistSection = document.getElementById("watchlist-section")

let watchlist = localStorage.getItem("watchlist")
watchlist = JSON.parse(watchlist)

watchlistSection.addEventListener("click", e => {
    if (e.target.id) {
        watchlist = watchlist.filter(id => !(id === e.target.id))
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
        renderFilms(watchlist)
    }
})

const renderFilms = async (array) =>  {
    if (array.length > 0) {
        let filmsString = ``
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
                            <a class="icon">
                                <i id="${imdbID}" class="fa-solid fa-square-minus fa-2x"></i>
                            </a>
                        </div>
                        <p class="plot">${Plot}</p>
                    </div>
                </section>`
        }
        watchlistSection.innerHTML = filmsString
    } else {
        watchlistSection.innerHTML = `
            <main class="container movies-container">
                <div class="placeholder">
                    <img src="/images/film-icon.png">
                    <p>Your watchlist is empty</p>
                </div>
            </main>`
    }
        
}

renderFilms(watchlist)