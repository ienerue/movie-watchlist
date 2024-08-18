const watchlistSection = document.getElementById("watchlist-section")

let watchlist = localStorage.getItem("watchlist")
watchlist = JSON.parse(watchlist)

watchlistSection.addEventListener("click", function(e){
    if (e.target.id) {
        watchlist = watchlist.filter(function(id){
            return !(id === e.target.id)
        })
        renderFilms(watchlist)
        console.log(watchlist)
        watchlist = JSON.stringify(watchlist)
        localStorage.setItem("watchlist", watchlist)
    }
})

function renderFilms(array) {
    if (watchlist.length > 0) {
        let filmsString = ``
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
                                    <button id="${data.imdbID}" class="remove ">Remove</button>
                                </div>
                                <p class="plot">${data.Plot}</p>
                            </div>
                        </section>`
                    watchlistSection.innerHTML = filmsString
                })
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