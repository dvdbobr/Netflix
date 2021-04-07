export const inisializeLocal = (user) => {
    const json = localStorage.getItem(`${user}List`);
    if (!json) {
        localStorage.setItem(`${user}List`, JSON.stringify([]));
    }
}
export const getUserData = (user) => {
    const json = localStorage.getItem(`${user}List`);
    const data = JSON.parse(json);
    return (data);
}

export const addMovieToLocal = (user, movieOrSeries, details) => {
    const json = localStorage.getItem(`${user}List`);
    const data = JSON.parse(json);
    data.push({ details, type: movieOrSeries });
    localStorage.setItem(`${user}List`, JSON.stringify(data));
}
export const inMyList = (user, id) => {
    const json = localStorage.getItem(`${user}List`);
    let data = JSON.parse(json);
    data = data.filter(movie => movie.details.id === id);
    if (data.length === 0)
        return false;
    else
        return true;
}
export const removeEvent = (event) => {
    const json = localStorage.getItem('myList');
    let data = JSON.parse(json);
    data = data.filter(curMovieOrSeries => curMovieOrSeries.id !== event.id);
    localStorage.setItem('myList', JSON.stringify(data));
}

