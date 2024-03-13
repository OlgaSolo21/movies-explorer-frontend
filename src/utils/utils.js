export function filteredMovies (movies, search) {
    const moviesByQuery = movies.filter((movie) => {
        const movieRu = String(movie.nameRU).toLowerCase().trim();
        const movieEn = String(movie.nameEN).toLowerCase().trim();
        const userQuery = search.toLowerCase().trim();
        return movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1;
    });
    return moviesByQuery;
}