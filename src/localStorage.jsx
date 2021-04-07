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
    console.log(data);
    data.push({ details, type: movieOrSeries });
    localStorage.setItem(`${user}List`, JSON.stringify(data));
}
export const inMyList = (user, id) => {
    const json = localStorage.getItem(`${user}List`);
    let data = JSON.parse(json);
    // console.log(data[0].details);
    console.log("in my list",data);
    data = data.filter(movie => movie.details.id === id);
    console.log("filtered",data);
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

