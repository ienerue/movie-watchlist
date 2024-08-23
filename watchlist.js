const watchlistSection = document.getElementById("watchlist-section")

let watchlist = localStorage.getItem("watchlist")
watchlist = JSON.parse(watchlist)

watchlistSection.addEventListener("click", e => {
    if (e.target.id) {
        watchlist = watchlist.filter(id => !(id === e.target.id))
        renderFilms(watchlist)
        console.log(watchlist)
        watchlist = JSON.stringify(watchlist)
        localStorage.setItem("watchlist", watchlist)
    }
})

const renderFilms = async (array) =>  {
    if (watchlist.length > 0) {
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
                            <button id="${imdbID}" class="remove ">Remove</button>
                        </div>
                        <p class="plot">${Plot}</p>
                    </div>
                </section>`
            watchlistSection.innerHTML = filmsString
        }
    } else {
        watchlistSection.innerHTML = `
            <div class="placeholder">
                <p>Your watchlist is looking a little empty...</p>
                <div class="add-movies">
                    <img src="/images/add-icon.png">
                    <p>Let's add some movies</p>
                </div>
            </div>`
    }
        
}

renderFilms(watchlist)