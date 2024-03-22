import {SHORTS_TIME} from "./constans";

export function filterSearchMovie(data, search) {
    const moviesByQuery = data.filter((f) => {
        const nameRU = f.nameRU.toLowerCase();
        const nameEN = f.nameEN.toLowerCase();
        const resultSearch = search.toLowerCase();
        return nameRU.includes(resultSearch) || nameEN.includes(resultSearch);
    });
    return moviesByQuery;
}
//
// export function filterSearchMovie(data, search) {
//     return data.filter(movie => {
//         const { nameRU, nameEN } = movie;
//         const query = search.toLowerCase();
//
//         return (
//             nameEN && nameEN.toLowerCase().includes(query) ||
//             (!nameEN && !query.includes(' ')) && nameRU.toLowerCase().includes(query))
//     })
// }

export function filterCheckbox(data) {
    return data.filter((f) => f.duration <= SHORTS_TIME)
}