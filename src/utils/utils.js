// export function filteredMovies (movies, search) {
//     const moviesByQuery = movies.filter((movie) => {
//         const movieRu = movie.nameRU.toLowerCase().trim();
//         const movieEn = movie.nameEN.toLowerCase().trim();
//         const userQuery = search.toLowerCase().trim();
//         return movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1;
//     });
//     return moviesByQuery;
// }

export function filterSearchMovie(data, isSearch) {
    const moviesResult =
        data.filter((f) => {
            const searchName =
            f.nameRU.toLowerCase().includes(isSearch.toLowerCase()) ||
            f.nameEN.toLowerCase().includes(isSearch.toLowerCase())
        return searchName
        // const nameRU = f.nameRU.toLowerCase();
        // const nameEN = f.nameEN.toLowerCase();
        // const query = movieSearch.toLowerCase()
        // return nameRU.indexOf(query) || nameEN.indexOf(query)
    })
    return moviesResult
}